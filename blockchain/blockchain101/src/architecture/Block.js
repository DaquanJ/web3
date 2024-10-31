const SHA256 = require('crypto-js/sha256');

// a block represents the set of information in a chain, each block is an instance (object) of this class 
export default class Block {
    constructor(timestap, transactions, previousHash = "") {
        this.timestap = timestap; // time transaction was made , or block was added to chain
        this.transactions = transactions; // can be a price , one block can have multiple transactions
        this.previousHash = previousHash; // hash tracks the previous block 
        this.nonce = 0;
        this.hash = "" // hash of the current block in chain that holds the information

    }

    // hash is calculated using sha256 algorithm based on block properties
    calculateHash() {
        return SHA256(this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce)
    }

    hasValidTransactions() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }
        return true;
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined, nonce: " + this.nonce + ", hash: " + this.hash)
    }
}