import Wallet from "../lib/wallet";
import dotenv, { parse } from 'dotenv';
import axios from "axios";
import readline from 'readline';
import Transaction from "../lib/transaction";
import TransactionType from "../lib/transactionType";
import TransactionInput from "../lib/transactionInput";
import TransactionOutput from "../lib/__mocks__/transactionOutput";
dotenv.config();

const BLOCKCHAIN_SERVER = process.env.BLOCKCHAIN_SERVER;

let myWalletPub = "";
let myWalletPriv = "";


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  setTimeout(() => {
    console.clear();

    if (myWalletPub) {
      console.log(`You are logged as ${myWalletPub}`);
    } else {
      console.log(`You are not logged.`);
    }

    console.log("1 - Create wallet");
    console.log("2 - Recover wallet");
    console.log("3 - Balance");
    console.log("4 - Send tx");
    console.log("5 - Search Tx");

    rl.question("Choose your option: ", (answer) => {
      switch (answer) {
        case "1":
          createWallet();
          break;
        case "2":
          recoverWallet();
          break;
        case "3":
          getBalance();
          break;
        case "4":
          sendTx();
          break;
        case "5":
          searchTx();
          break;
        default: {
          console.log("wrong option!");
          menu();
        }

      }
    });
  }, 1000)
}

function preMenu() {
  rl.question("Press any key to continue...", () => {
    menu();
  });
}

function createWallet() {
  console.clear();
  const wallet = new Wallet();
  console.log("Your new wallet:");
  console.log(wallet);

  myWalletPub = wallet.publicKey;
  myWalletPriv = wallet.privateKey;
  preMenu();
}

function recoverWallet() {
  rl.question("What is  your private key or WIF ", (wifOrPrivateKey) => {
    console.clear();
    const wallet = new Wallet(wifOrPrivateKey);
    console.log("Your recovery wallet: ");
    console.log(wallet);

    myWalletPub = wallet.publicKey;
    myWalletPriv = wallet.privateKey;
    preMenu();
  });
}


async function getBalance() {
  console.clear();

  if (!myWalletPub) {
    console.log('You dont have a wallet yet...');
    return preMenu();
  }
  //TODO: get balance via API

  const {data} = await axios.get(`${BLOCKCHAIN_SERVER}/wallets/${myWalletPub}`);
  console.log("Balance: " + data.balance);



  preMenu();
}


function sendTx() {
  console.clear();

  if (!myWalletPub) {
      console.log(`You don't have a wallet yet.`);
      return preMenu();
  }

  console.log(`Your wallet is ${myWalletPub}`);
  rl.question(`To Wallet: `, (toWallet) => {
      if (toWallet.length < 66) {
          console.log(`Invalid wallet.`);
          return preMenu();
      }

      rl.question(`Amount: `, async (amountStr) => {
          const amount = parseInt(amountStr);
          if (!amount) {
              console.log(`Invalid amount.`);
              return preMenu();
          }

          const walletResponse = await axios.get(`${BLOCKCHAIN_SERVER}/wallets/${myWalletPub}`);
          const balance = walletResponse.data.balance as number;
          const fee = walletResponse.data.fee as number;
          const utxo = walletResponse.data.utxo as TransactionOutput[];

          if (balance < amount + fee) {
              console.log(`Insufficient balance (tx + fee).`);
              return preMenu();
          }

          const txInputs = utxo.map(txo => TransactionInput.fromTxo(txo));

          txInputs.forEach((txi, index,arr)=> arr[index].sign(myWalletPriv));

          const txOutputs = [] as TransactionOutput[];

          //transação de transferencia
          txOutputs.push(new TransactionOutput({
            toAddress: toWallet,
             amount
          } as TransactionOutput))


          const remainingBalance = balance - amount - fee;

          //transação de troco
          txOutputs.push(new TransactionOutput({
            toAddress: myWalletPub,
            amount: remainingBalance
          } as TransactionOutput))

          const tx = new Transaction({
            txInputs,
            txOutputs
          } as Transaction);
          
          tx.hash = tx.getHash();
          tx.txOutputs.forEach((txo,index,arr)=>arr[index].tx = tx.hash );

          console.log(tx);
          console.log("Remaining Balance: " + remainingBalance);
          try {
              const txResponse = await axios.post(`${BLOCKCHAIN_SERVER}/transactions/`, tx);
              console.log(`Transaction accepted. Waiting the miners!`);
              console.log(txResponse.data.hash);
          }
          catch (err: any) {
              console.error(err.response ? err.response.data : err.message);
          }

          return preMenu();
      })
  })

  preMenu();
}

function searchTx() {
  console.clear();
  rl.question("Your tx hash: ", async (hash) => {
    const txResponse = await axios.get(`${BLOCKCHAIN_SERVER}/transactions/${hash}`);
    console.log(txResponse.data);
    preMenu();
  });


}


menu();


/*
Wallet {
  privateKey: '55b5b78037d12010e413ca8f15abc284ac0533c048a155448b120a796187b8b1',
  publicKey: '02a5c99a8dd12bb98a7f8a846e019b19203f3e24253330c9ed6f814082a39682dc'
}
*/ 


//03f92cdcc6a7c868d72f9be95cd13bed4d9b97b36b348cee8f44ad6e7ce3e92127