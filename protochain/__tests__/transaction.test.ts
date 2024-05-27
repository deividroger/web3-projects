import { describe, test, expect, jest, beforeAll } from '@jest/globals'
import Transaction from '../src/lib/transaction';
import TransactionType from '../src/lib/transactionType';
import TransactionInput from '../src/lib/transactionInput';
import TransactionOutput from '../src/lib/transactionOutput';
import Wallet from '../src/lib/wallet';


jest.mock('../src/lib/transactionInput');
jest.mock('../src/lib/transactionOutput');

describe('Transaction tests', () => {

    const  exampleDifficulty: number = 1;
    const  exampleFee: number = 1;
    const exampleTx: string = "71249fde40b27f16a9ccf9676456a641fb18c59223667d42f23ed32c85f92e79";
    let alice: Wallet;
    let bob: Wallet;

    beforeAll(()=>{
        alice = new Wallet();
        bob = new Wallet();
    })

    test('should be valid (REGULAR default)', () => {

        const tx = new Transaction({
            txInputs: [new TransactionInput()],
            txOutputs: [new TransactionOutput()]
        } as Transaction)

        const valid = tx.isValid(exampleDifficulty,exampleFee);
        expect(valid.success).toBeTruthy();

    });

    test('should NOT be valid (txto hash != tx hash)', () => {

        const tx = new Transaction({
            txInputs: [new TransactionInput()],
            txOutputs: [new TransactionOutput()]
        } as Transaction)

        tx.txOutputs[0].tx = 'aleatory';

        const valid = tx.isValid(exampleDifficulty,exampleFee);
        expect(valid.success).toBeFalsy();

    });

    test('should  NOT be valid (input < outputs)', () => {

        const tx = new Transaction({
            txInputs: [new TransactionInput({
                amount:1
            } as TransactionInput)],
            txOutputs: [new TransactionOutput({
                amount:2
            } as TransactionOutput)]
        } as Transaction)

        const valid = tx.isValid(exampleDifficulty,exampleFee);
        expect(valid.success).toBeFalsy();

    });

    test('should not be valid (invalid hash)', () => {

        const tx = new Transaction({
            txInputs: [new TransactionInput()],
            txOutputs: [new TransactionOutput()],
            type: TransactionType.REGULAR,  
            timestamp: Date.now(),
            hash: 'abc'
        } as Transaction)

        const valid = tx.isValid(exampleDifficulty,exampleFee);
        expect(valid.success).toBeFalsy();

    });

    test('should be valid (FEE)', () => {

        const tx = new Transaction({
            txOutputs: [new TransactionOutput()],
            type: TransactionType.FEE
        } as Transaction)

        tx.txInputs = undefined;
        tx.hash = tx.getHash();

        const valid = tx.isValid(exampleDifficulty,exampleFee);

        expect(valid.success).toBeTruthy();

    });

    test('should not be valid (invalid to)', () => {

        const tx = new Transaction()
        const valid = tx.isValid(exampleDifficulty,exampleFee);
        expect(valid.success).toBeFalsy();

    });

    test('should not be valid (invalid txInput)', () => {

        const tx = new Transaction({
            txOutputs: [new TransactionOutput()],
            txInputs : [new TransactionInput({
                amount: -10,
                fromAddress: 'carteira from',
                signature: 'abc'   
            } as TransactionInput)]
        } as Transaction)
        
        const valid = tx.isValid(exampleDifficulty,exampleFee);
        expect(valid.success).toBeFalsy();

    });

    test('should get fee',()=>{
        const txIn = new TransactionInput({
            amount: 11,
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
            txOutputs: [txOut],
        } as Transaction);

        const result = tx.getFee();

        expect(result).toBeGreaterThan(0);

    });

    test('should get zero fee',()=>{
        const tx = new Transaction();
        tx.txInputs = undefined;

        const result = tx.getFee();

        expect(result).toEqual(0);

    });

    test('should create from reward',()=>{

        const txo = new TransactionOutput({
            amount: 10,
            toAddress: alice.publicKey,
            tx: exampleTx
        } as TransactionOutput)

        const tx = Transaction.fromReward(txo);

        const result = tx.isValid(exampleDifficulty,exampleFee);

        expect(result.success).toBeTruthy();

    });

    test('should not be valid (fee excess)',()=>{

        const txo = new TransactionOutput({
            amount: Number.MAX_VALUE,
            toAddress: bob.publicKey,
            tx: exampleTx
        } as TransactionOutput)

        const tx = new Transaction({
            type: TransactionType.FEE,
            txOutputs: [txo]
        } as Transaction);

        const result = tx.isValid(exampleDifficulty,exampleFee);

        expect(result.success).toBeFalsy();

    });

})