const SHA256 = require("crypto-js/sha256")
import Elliptic from 'elliptic'

const ec = new Elliptic.ec("secp256k1")

export default class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    // once a transaction is added to chain, we need to validate each transaction
    calculateHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount)
    }

    signTransaction(signingKey) {
        if (this.fromAddress === null) return true;

        // verify the source is the persons address 
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error("You cannot sign transactions for other wallets!")
        }
        // sign transaction with private key (private key is your password on the chain)
        this.hash = this.calculateHash();

        const sign = signingKey.sign(this.hash, "base64")

        // convert the signature to the DER format
        this.signature = sign.toDER('hex');

        console.log("signature: " + this.signature)
    }

    isValid() {
        if (this.fromAddress === null) return true
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error("You cannot sign transactions for other wallets!")
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex')

        console.log("signature: " + this.signature)

        return publicKey.verify(this.calculateHash(), this.signature)

    }
}