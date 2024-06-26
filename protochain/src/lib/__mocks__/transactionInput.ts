
import Validation from '../validation';


/*
Mocked Transaction Input class
*/
export default class TransactionInput {
    fromAddress: string;
    amount: number;
    signature: string;
    previousTx: string;

    /**
     * Creates a new TransactionInput 
     * @param txInput The tx input data
     */
    constructor(txInput?: TransactionInput) {
        this.fromAddress = txInput?.fromAddress || "carteira 1";
        this.amount = txInput?.amount || 10;
        this.signature = txInput?.signature || "abc";
        this.previousTx = txInput?.previousTx || "xyz"
    }

    /**
     * generates the tx input signature
     * @param privateKey the 'from' private key
     */
    sign(privateKey: string): void {
        this.signature = "abc";
    }

    /**
     * Generates the tx input hash
     * @returns the Tx input hash
     */
    getHash(): string {
        return "abc";
    }

    /**
     * Validates if the tx input is ok
     * @returns Returns a validation result object
     */
    isValid(): Validation {

        if (!this.previousTx || !this.signature) {
            return new Validation(false, "Signature and previous  Tx are required");
        }

        if (this.amount < 1) {
            return new Validation(false, "Amount must be greater than zero.")
        }

        return new Validation();
    }
}