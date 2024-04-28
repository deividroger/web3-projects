import { describe, test, beforeAll, expect } from '@jest/globals'
import Wallet from '../src/lib/wallet';
import TransactionInput from '../src/lib/transactionInput';



describe('TransactionInput tests', () => {

    let alice: Wallet;
    let bob: Wallet;

    beforeAll(() => {
        alice = new Wallet();
        bob = new Wallet();
    });

    test('should be valid', () => {
        const txtInput = new TransactionInput({
            amount: 10,
            fromAddress: alice.publicKey
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
            fromAddress: alice.publicKey
        } as TransactionInput);


        const valid = txtInput.isValid();
        expect(valid.success).toBeFalsy();
    });

    test('should not be valid (negative amount)', () => {
        const txtInput = new TransactionInput({
            amount: -10,
            fromAddress: alice.publicKey
        } as TransactionInput);


        txtInput.sign(alice.privateKey);
        const valid = txtInput.isValid();
        expect(valid.success).toBeFalsy();
    });

    test('should not be valid (invalid signature)', () => {
        const txtInput = new TransactionInput({
            amount: 10,
            fromAddress: alice.publicKey
        } as TransactionInput);


        txtInput.sign(bob.privateKey);
        const valid = txtInput.isValid();
        expect(valid.success).toBeFalsy();
    });

})