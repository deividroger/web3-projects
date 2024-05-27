import { describe, test, expect, beforeAll, jest } from '@jest/globals'
import Block from '../src/lib/block';
import BlockInfo from '../src/lib/blockInfo';
import Transaction from '../src/lib/transaction';
import TransactionType from '../src/lib/transactionType';
import TransactionInput from '../src/lib/transactionInput';
import TransactionOutput from '../src/lib/transactionOutput';

import Wallet from '../src/lib/wallet';

jest.mock('../src/lib/transaction');
jest.mock('../src/lib/transactionInput');
jest.mock('../src/lib/transactionOutput');
describe('Block tests', () => {

    let genesis: Block;
    const exampleDifficulty: number = 1;
    const exampleFee: number = 1;
    let alice:  Wallet;
    let bob:  Wallet;
    const exampleTx: string = 'c11b03922bba9085744f077ea28819dbac03cf6d2060c270e9d9aae941b8e806';
    
    

    beforeAll(() => {
        
        alice = new Wallet();
        bob = new Wallet();

        genesis = new Block({
            index: 0,
            previousHash: "",
            transactions: [new Transaction({
                txInputs: [new TransactionInput()],
            } as Transaction)]
        } as Block)
    });

    function getFullBlock():Block{

        const txIn = new TransactionInput({
            amount: 10,
            fromAddress: alice.publicKey,
            previousTx: exampleTx
        } as TransactionInput);

        txIn.sign(alice.privateKey);
        
        const txOut = new TransactionOutput({   
            amount: 10,
            toAddress: bob.publicKey
        } as TransactionOutput);
    
        const tx = new Transaction({
            txInputs: [txIn],
            txOutputs: [txOut]
        } as Transaction);

        const txFee = new Transaction({
            type: TransactionType.FEE,
            txOutputs: [new TransactionOutput({
                amount: 1,
                toAddress: alice.publicKey
            }as TransactionOutput)]
        } as Transaction);

        const block = new Block({
            index: 1,
            transactions: [tx,txFee],
            previousHash: genesis.hash

        } as Block);

        block.mine(exampleDifficulty,alice.publicKey);

        return block;
    }

    test('Should be valid', () => {
        const block = getFullBlock();
        
        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty, exampleFee);
        expect(valid.success).toBeTruthy();

    });

    test('Should not be valid (different hash)', () => {
        const block = getFullBlock();
        block.hash = "wedfewsrwe";
        
        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty, exampleFee);
        expect(valid.success).toBeFalsy();
    });

    test('Should not be valid (no fee)', () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            transactions: [new Transaction({
                txInputs: [new TransactionInput()],
            } as Transaction)]
        } as Block);

        
        block.mine(exampleDifficulty, alice.publicKey);

        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty,exampleFee);
        
        expect(valid.success).toBeFalsy();

    });


    test('Should create from blockinfo', () => {
        const block = Block.fromBlockInfo({
            transactions: [new Transaction({
                txInputs: [new TransactionInput()],
            } as Transaction)],
            difficulty: exampleDifficulty,
            feePerTx: 1,
            index: 1,
            maxDifficulty: 62,
            previousHash: genesis.hash
        } as BlockInfo);

        block.transactions.push(new Transaction({
            type: TransactionType.FEE,
            txOutputs: [ new TransactionOutput({
                toAddress: alice.publicKey,
                amount: 1
            } as TransactionOutput)]
        } as Transaction));

        block.hash = block.getHash()

        block.mine(exampleDifficulty, alice.publicKey);

        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty,exampleFee);
        
        expect(valid.success).toBeTruthy();

    });


    test('Should NOT be valid (fallbacks)', () => {
        const block = new Block();

        block.transactions.push(new Transaction({
            type: TransactionType.FEE,
            txOutputs: [ new TransactionOutput()]
        } as Transaction));
        
        block.hash = block.getHash()

        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty, exampleFee);

        expect(valid.success).toBeFalsy();

    });


    test('Should NOT be valid (previous Hash)', () => {
        const block = getFullBlock();

        block.previousHash  = "wrong"

        block.hash = block.getHash();

        block.mine(exampleDifficulty, alice.publicKey);
        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty,exampleFee);

        expect(valid.success).toBeFalsy();

    });

    test('Should NOT be valid (timestamp)', () => {
        const block = getFullBlock();
        block.timestamp = -1;

        block.hash = block.getHash();
        block.mine(exampleDifficulty,alice.publicKey);

        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty, exampleFee);

        expect(valid.success).toBeFalsy();

    });


    test('Should NOT be valid (empty hash)', () => {
        const block = getFullBlock();


        block.hash = "";

        block.mine(exampleDifficulty, alice.publicKey);

        block.hash = "";
        
        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty,exampleFee);

        expect(valid.success).toBeFalsy();

    });

    test('Should NOT be valid (no mined)', () => {
        const block = getFullBlock();
        block.nonce = 0;

        block.hash = block.getHash();
        
        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty,exampleFee);

        expect(valid.success).toBeFalsy();

    });

    test('Should NOT be valid (invalid index)', () => {
        const block = getFullBlock();

        block.index= -1;

        block.hash = block.getHash()

        block.mine(exampleDifficulty, alice.publicKey);

        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty,exampleFee);

        expect(valid.success).toBeFalsy();

    });


    test('Should not be valid (2 FEE)', () => {
        const block = getFullBlock();

        block.transactions.push(new Transaction({
            type: TransactionType.FEE,
            txOutputs: [new TransactionOutput()],
            txInputs: undefined
        } as Transaction));


        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty, exampleFee);
        expect(valid.success).toBeFalsy();

    });


    test('Should not be valid (invalid tx)', () => {
        
    
        const block = getFullBlock();

        block.transactions[0].timestamp = -1;

    
        block.hash = block.getHash()

        block.mine(exampleDifficulty, alice.publicKey);
        
        
        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty, exampleFee) ;
        expect(valid.success).toBeFalsy();

    });

})