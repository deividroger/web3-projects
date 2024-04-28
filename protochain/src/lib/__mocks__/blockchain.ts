import Block from "./block";
import Validation from "../validation";
import BlockInfo from "../blockInfo";
import Transaction from "./transaction";
import TransactionType from "../transactionType";
import TransactionSearch from "../transactionSearch";
import TransactionInput from "./transactionInput";
/**
 * Mock Blockchain class
 */
export default class BlockChain {

    blocks: Block[];
    nextIndex: number = 0;
    mempool: Transaction[];
    static readonly DIFFICULTY_FACTOR = 5;
    static readonly MAX_DIFFICULTY = 62;

    /**
     * Creates a new Mock Blockchain
     */
    constructor() {

        this.mempool = [];

        this.blocks = [new Block({
            index: 0,
            previousHash: "",
            transactions: [new Transaction({
                txInput: new TransactionInput(),
                type: TransactionType.FEE
            } as Transaction)],
            timestamp: Date.now(),
            hash: 'abc'
        } as Block)]
        this.nextIndex++;
    }

    getLastBlock(): Block {
        return this.blocks[this.blocks.length - 1];
    }

    addBlock(block: Block): Validation {

        if (block.index < 0) return new Validation(false, "Invalid mock block.");

        this.blocks.push(block);
        this.nextIndex++;

        return new Validation();
    }

    addTransaction(transaction: Transaction): Validation {

        const validation = transaction.isValid();
        if (!transaction.isValid()) {
            return validation
        }

        this.mempool.push(transaction);

        return new Validation();
    }

    getTransaction(hash: string): TransactionSearch {

        return {
            mempoolIndex: 0,
            transaction: {
                hash: hash
            }
        } as TransactionSearch;
    }

    getBlock(hash: string): Block | undefined {
        return this.blocks.find(b => b.hash === hash)!;
    }

    isValid(): Validation {
        return new Validation();
    }

    getFeePerTx(): number {
        return 1;
    }

    getDifficulty(): number {
        return Math.ceil(this.blocks.length / BlockChain.DIFFICULTY_FACTOR) +1 ;
    }

    getNextBlock(): BlockInfo {


        const transactions = [new Transaction({
            txInput: new TransactionInput(),
        } as Transaction)];

        const difficulty = this.getDifficulty();
        const previousHash = this.getLastBlock().hash;
        const index = this.blocks.length;
        const feePerTx = this.getFeePerTx();
        const maxDifficulty = BlockChain.MAX_DIFFICULTY;

        const blockInfo = {
            index: index,
            previousHash: previousHash,
            difficulty: difficulty,
            maxDifficulty: maxDifficulty,
            feePerTx: feePerTx,
            transactions: transactions,
        } as BlockInfo;

        return blockInfo;
    }
}