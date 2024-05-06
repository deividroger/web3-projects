import { describe, test, expect, jest, beforeAll } from '@jest/globals'
import BlockChain from '../src/lib/blockchain'
import Block from '../src/lib/block';
import Transaction from '../src/lib/transaction';
import TransactionInput from '../src/lib/transactionInput';
import Wallet from '../src/lib/wallet';

jest.mock('../src/lib/block');
jest.mock('../src/lib/transaction');
jest.mock('../src/lib/transactionInput');
jest.mock('../src/lib/transactionOutput');

describe('Block tests', () => {


    let alice: Wallet;

    beforeAll(()=>{
        alice = new Wallet() 
    });

    test('Should has genesis block', () => {

        const blockchain = new BlockChain(alice.publicKey);
        expect(blockchain.blocks.length).toEqual(1);

    });

    test('Should be valid', () => {

        const blockchain = new BlockChain(alice.publicKey);
        expect(blockchain.isValid().success).toBeTruthy();

    });

    test('Should be valid (two blocks)', () => {

        const blockchain = new BlockChain(alice.publicKey);

        const previousBlock = blockchain.getLastBlock();

        const tx = new Transaction({
            txInputs: [new TransactionInput()],
        } as Transaction)

        blockchain.mempool.push(tx);

       const validation =  blockchain.addBlock(new Block({
            index: 1,
            previousHash: previousBlock.hash,
            transactions: [tx]
        } as Block));

        expect(blockchain.isValid().success).toBeTruthy();
        expect(blockchain.blocks.length).toEqual(2);


    });

    test('Should NOT be valid', () => {

        const blockchain = new BlockChain(alice.publicKey);

        const tx = new Transaction({
            txInputs: [new TransactionInput()]
        } as Transaction)

        blockchain.mempool.push(tx);
        const previousBlock = blockchain.getLastBlock();

        blockchain.addBlock(new Block({
            index: 1,
            previousHash: previousBlock.hash,
            transactions: [tx]
        } as Block));

        blockchain.blocks[1].index = -1;

        expect(blockchain.isValid().success).toEqual(false)


    });

    test('Should add transaction', () => {

        const blockchain = new BlockChain(alice.publicKey);

        const tx = new Transaction({
            txInputs: [new TransactionInput()],
            hash: '12325643643635654'
        } as Transaction)


        const validation = blockchain.addTransaction(tx);

        expect(validation.success).toEqual(true);

    });

    test('Should NOT add transaction (pending TX)', () => {

        const blockchain = new BlockChain(alice.publicKey);

        const tx = new Transaction({
            txInputs: [new TransactionInput()],
            hash: '12325643643635654'
        } as Transaction)


        const tx2 = new Transaction({
            txInputs: [new TransactionInput()],
            hash: '12325643643635652'
        } as Transaction)


        blockchain.addTransaction(tx);
        const validation = blockchain.addTransaction(tx2);

        expect(validation.success).toBeFalsy();

    });

    test('Should  NOT add transaction (INVALid tx)', () => {

        const blockchain = new BlockChain(alice.publicKey);


        const tx = new Transaction({
            txInputs: [new TransactionInput()],
            hash: 'xsdfdwsfedws',
            timestamp: -1
        } as Transaction)

        const validation = blockchain.addTransaction(tx);


        expect(validation.success).toEqual(false);

    });

    test('Should  NOT add transaction (Duplicated in blockchain)', () => {

        const blockchain = new BlockChain(alice.publicKey);

        const tx = new Transaction({
            txInputs: [new TransactionInput()],
            hash: 'xsdfdwsfedws'
        } as Transaction)

        blockchain.blocks.push(new Block({
            transactions: [tx]
        } as Block))

        const validation = blockchain.addTransaction(tx);

        expect(validation.success).toEqual(false);

    });

    
    test('Should get transaction (mempool)', () => {

        const blockchain = new BlockChain(alice.publicKey);

        const tx = new Transaction({
            txInputs: [new TransactionInput()],
            hash: '23423543532'
        } as Transaction)

        blockchain.mempool.push(tx);

        const result = blockchain.getTransaction('23423543532');


        expect(result.mempoolIndex).toEqual(0);

    });

    test('Should get transaction (blockchain)', () => {

        const blockchain = new BlockChain(alice.publicKey);

        const tx = new Transaction({
            txInputs: [new TransactionInput()],
            hash: '23423543532'
        } as Transaction)

        blockchain.blocks.push(new Block({
            transactions: [tx]
        } as Block))

        const result = blockchain.getTransaction('23423543532');


        expect(result.blockIndex).toEqual(1);

    });

    test('Should  not get transaction', () => {

        const blockchain = new BlockChain(alice.publicKey);

        const result = blockchain.getTransaction('xyx');

        expect(result.blockIndex).toEqual(-1);
        expect(result.mempoolIndex).toEqual(-1);
        expect(result.transaction).toBeUndefined();

    });


    test('Should add block', () => {

        const blockchain = new BlockChain(alice.publicKey);

        const tx = new Transaction({
            txInputs: [new TransactionInput()],
        } as Transaction)

        blockchain.mempool.push(tx);

        const previousBlock = blockchain.getLastBlock();

        const result = blockchain.addBlock(new Block({
            index: 1,
            previousHash: previousBlock.hash,
            transactions: [tx]
        } as Block));

        expect(result.success).toEqual(true);

    });

    test('Should get block', () => {

        const blockchain = new BlockChain(alice.publicKey);

        const previousBlock = blockchain.getLastBlock();
        

        // blockchain.addBlock(new Block({
        //     index: 1,
        //     previousHash: previousBlock.hash,
        //     transactions: [new Transaction({
        //         txInputs: [new TransactionInput()],
        //     } as Transaction)]
        // } as Block));

        const block = blockchain.getBlock(previousBlock.getHash());

        expect(block).toBeTruthy();

    });


    test('Should NOT add block', () => {

        const blockchain = new BlockChain(alice.publicKey);

        const tx = new Transaction({
            txInputs: [new TransactionInput()]
        } as Transaction);

        const block = new Block({
            index: -1,
            previousHash: blockchain.blocks[0].hash,
            transactions: [tx]
        } as Block)
        
        blockchain.mempool.push(tx);

        const result = blockchain.addBlock(block);
        expect(result.success).toEqual(false);

    });

    test('Should get nextBlockInfo', () => {

        const blockchain = new BlockChain(alice.publicKey);

        blockchain.mempool.push(new Transaction());

        const info = blockchain.getNextBlock();

        expect(info ? info.index : 0).toEqual(1);
    })

    test('Should NOT get nextBlockInfo', () => {
        const blockchain = new BlockChain(alice.publicKey);
        const info = blockchain.getNextBlock();
        expect(info).toBeNull();
    })
})