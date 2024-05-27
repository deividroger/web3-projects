import Block from './block';
import Validation from '../validation';
import BlockInfo from '../blockInfo';
import Transaction from './transaction';
import TransactionSearch from '../transactionSearch';
import TransactionInput from './transactionInput';
import TransactionOutput from './transactionOutput';
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

        const validation = transaction.isValid(1,10);
        if (!validation.success) {
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
        return {
            transactions: this.mempool.slice(0, 2),
            difficulty: 2,
            previousHash: this.getLastBlock().hash,
            index: this.blocks.length,
            feePerTx: this.getFeePerTx(),
            maxDifficulty: 62,
        } as BlockInfo;
    }

    getTxInputs(wallet: string): (TransactionInput[] | undefined){ 
    
        return [new TransactionInput({
                amount: 10,
                fromAddress: wallet,
                previousTx: 'abc',
                signature: 'abc',

        }as TransactionInput)];

    }

    getTxOutput(wallet:string): TransactionOutput[]   {
        return [ new TransactionOutput({
            amount: 10,
            toAddress: wallet,
            tx: 'abc'

        } as TransactionOutput)];
    }

    getUtxo(wallet: string): TransactionOutput[] {
        return this.getTxOutput(wallet);
    }

    getBalance(wallet: string) : number{
        return 10;
    }
}