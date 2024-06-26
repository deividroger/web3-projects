import { describe, test, beforeAll, expect } from '@jest/globals'
import Wallet from '../src/lib/wallet';
import TransactionOutput from '../src/lib/transactionOutput';


describe('TransactionOutput tests', () => {

    let alice: Wallet;
    let bob: Wallet;

    beforeAll(() => {
        alice = new Wallet();
        bob = new Wallet();
    });

    test('should be valid', () => {
        const txtOutput = new TransactionOutput({
            amount: 10,
            toAddress: alice.publicKey,
            tx: "abc"
        } as TransactionOutput);

        const valid = txtOutput.isValid();
        expect(valid.success).toBeTruthy();
    });

    test('should NOT be valid (default)', () => {
        const txtOutput = new TransactionOutput();

        const valid = txtOutput.isValid();
        expect(valid.success).toBeFalsy();
    });

    test('should NOT be valid', () => {

        const txtOutput = new TransactionOutput({
            amount: -10,
            toAddress: alice.publicKey,
            tx: "abc"
        } as TransactionOutput);

        const valid = txtOutput.isValid();
        expect(valid.success).toBeFalsy();
    });

    test('should get Hash', () => {
        const txtOutput = new TransactionOutput({
            amount: 10,
            toAddress: alice.publicKey,
            tx: "abc"
        } as TransactionOutput);

        const hash = txtOutput.getHash();

        expect(hash).toBeTruthy();
    });

})