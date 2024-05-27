import { describe, test, beforeAll, expect } from '@jest/globals'
import Wallet from '../src/lib/wallet';
import TransactionInput from '../src/lib/transactionInput';
import TransactionOutput from '../src/lib/transactionOutput';



describe('TransactionInput tests', () => {

    let alice: Wallet;
    let bob: Wallet;
    const exampleTx: string = "71249fde40b27f16a9ccf9676456a641fb18c59223667d42f23ed32c85f92e79";

    beforeAll(() => {
        alice = new Wallet();
        bob = new Wallet();
    });

    test('should be valid', () => {
        const txtInput = new TransactionInput({
            amount: 10,
            fromAddress: alice.publicKey,
            previousTx: 'abc'
        } as TransactionInput);

        txtInput.sign(alice.privateKey);

        const valid = txtInput.isValid();
        expect(valid.success).toBeTruthy();
    });

    test('should NOT be valid (DEFAULTS)', () => {
        
        const txtInput = new TransactionInput();

        txtInput.sign(alice.privateKey);

        const valid = txtInput.isValid();
        expect(valid.success).toBeFalsy();
    });

    test('should not be valid (empty signature)', () => {
        const txtInput = new TransactionInput({
            amount: 10,
            fromAddress: alice.publicKey,
            previousTx: 'abc'
        } as TransactionInput);


        const valid = txtInput.isValid();
        expect(valid.success).toBeFalsy();
    });

    test('should not be valid (negative amount)', () => {
        const txtInput = new TransactionInput({
            amount: -10,
            fromAddress: alice.publicKey,
            previousTx: 'abc'
        } as TransactionInput);


        txtInput.sign(alice.privateKey);
        const valid = txtInput.isValid();
        expect(valid.success).toBeFalsy();
    });

    test('should not be valid (invalid signature)', () => {
        const txtInput = new TransactionInput({
            amount: 10,
            fromAddress: alice.publicKey,
            previousTx: 'abc'
        } as TransactionInput);


        txtInput.sign(bob.privateKey);
        const valid = txtInput.isValid();
        expect(valid.success).toBeFalsy();
    });

    test('should not be valid (invalid previous TX)', () => {
        const txtInput = new TransactionInput({
            amount: 10,
            fromAddress: alice.publicKey,
        } as TransactionInput);

        txtInput.sign(alice.privateKey);
        const valid = txtInput.isValid();
        expect(valid.success).toBeFalsy();
    });

    test('should create from TXO',()=>{

        const txo = new TransactionOutput({
            amount: 20,
            toAddress: alice.publicKey,
            tx: exampleTx
        } as TransactionOutput);

        const txi = TransactionInput.fromTxo(txo);
        
        txi.sign(alice.privateKey);
        txi.amount =11;

        const result = txi.isValid();

        expect(result.success).toBeFalsy();

    });

})