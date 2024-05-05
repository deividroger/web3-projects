import dotenv from 'dotenv'
dotenv.config();

import axios from "axios";
import BlockInfo from "../lib/blockInfo";
import Block from "../lib/block";
import Wallet from '../lib/wallet';
import Transaction from '../lib/transaction';
import TransactionType from '../lib/transactionType';
import TransactionOutput from '../lib/transactionOutput';


const BLOCKCHAIN_SERVER = process.env.BLOCKCHAIN_SERVER;

const minerWallet = new Wallet(process.env.MINER_WALLET);


console.log("Logged as " + minerWallet.publicKey);

let totalMined = 0;


function getRewardTx(): Transaction {
    const txo = new TransactionOutput({
        toAddress: minerWallet.publicKey,
        amount: 10
    } as TransactionOutput);

    const tx = new Transaction({
        txOutputs: [txo],
        type: TransactionType.FEE
    } as Transaction);

    tx.hash = tx.getHash();
    tx.txOutputs[0].tx = tx.hash;

    return tx;
}


async function mine() {
    console.log("Getting next block info...")

    const { data } = await axios.get(`${BLOCKCHAIN_SERVER}/blocks/next`);
    const blockInfo = data as BlockInfo;

    if (!data) {
        console.log('No tx found...waiting...');
        return setTimeout(() => {
            mine();
        }, 5000);
    }

    const newblock = Block.fromBlockInfo(blockInfo);

    newblock.transactions.push(getRewardTx());

    newblock.miner = minerWallet.publicKey;
    newblock.hash = newblock.getHash();

    console.log("Start mining block #" + blockInfo.index);

    newblock.mine(blockInfo.difficulty, minerWallet.publicKey);

    console.log("BLock mined! Sending to blockchaing...");

    try {
        await axios.post(`${BLOCKCHAIN_SERVER}/blocks`, newblock);
        console.log("Block sent and accepted");
        totalMined++;
        console.log(`Total mined blocks # ${totalMined}`);
    } catch (error: any) {
        console.error(error.response ? error.response.data : error.message)
    }

    setTimeout(() => {
        mine();
    }, 2000);

}

mine();