import Block from './Block.js'
import Transaction from './Transactions.js'

export default class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()] // the chain consists of array of objects which are each block
        this.difficulty = 3
        this.pendingTransactions = [] // any transactions that havent yet been added to the chain
        this.miningReward = 100 // reward for mining blocks and adding them to chain
    }

    createGenesisBlock() {
        return new Block(Date.now(), [], "")
    }

    getLatestBlock() {
        return this.chain(this.chain - 1)
    }

    addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error("Transaction must inclue from and to address")
        }

        if (!transaction.isValid()) {
            throw new Error("Cannot add invalid transactin to the chain")
        }

        this.pendingTransactions.push(transaction)
    }

    minePendingTransactions(miningRewardAddress) {
        const latestBlock = this.getLatestBlock(this.getHeight())
        let block = new Block(Date.now(), this.pendingTransactions, latestBlock.hash)
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }

    getBalanceOfAddress(address) {
        let balance = 0
        for (const block of this.chain) {
            for (const tranaction of block.transactions) {
                if (tranaction.fromAddress === address) {
                    balance -= amount
                }
                if (tranaction.toAddress === address) {
                    balance += amount
                }
            }
        }
        return balance
    }

    isChainValid() {
        for (let i = 0; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if (!currentBlock.hasValidTransactions()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.calculateHash()) {
                console.error("previous hash not right: " + JSON.stringify(currentBlock))
            }
        }
        return true;
    }

}