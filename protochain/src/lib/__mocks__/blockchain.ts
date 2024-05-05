import Block from "./block";
import Validation from "../validation";
import BlockInfo from "../blockInfo";
import Transaction from "./transaction";
import TransactionSearch from "../transactionSearch";
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
    constructor(miner: string) {

        this.blocks = [];
        this.mempool = [new Transaction()];

        this.blocks.push(new Block(
            {
                index: 0,
                previousHash: "abc",
                miner: miner,
                timestamp: Date.now(),
                hash: 'abc'
            } as Block

        ));
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


        if (hash === "-1") {
            return {
                mempoolIndex: -1,
                blockIndex: -1
            } as TransactionSearch
        }

        return {
            mempoolIndex: 0,
            blockIndex:1 ,
            transaction: new Transaction()
        } as TransactionSearch;
    }

    getBlock(hash: string): Block | undefined {

        if(!hash || hash === "-1"){
            return undefined;
        }

        return this.blocks.find(b => b.hash === hash)!;
    }

    isValid(): Validation {
        return new Validation();
    }

    getFeePerTx(): number {
        return 1;
    }

    getDifficulty(): number {
        return Math.ceil(this.blocks.length / BlockChain.DIFFICULTY_FACTOR) + 1;
    }

    getNextBlock(): BlockInfo {


        const transactions = this.mempool.slice(0,2);

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