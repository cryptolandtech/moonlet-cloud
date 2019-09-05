import ZilApp from "./zil-interface";
import * as zcrypto from '@zilliqa-js/crypto';

export class Zil {
    constructor(transport) {
        this.app = new ZilApp.default(transport);
    }

    /**
     * @param {number} index index of account
     * @param {number} derivationIndex index of derivation for an account
     * @param {number} path derivation path, values accepted: live, legacy
     */
    getAddress({index, derivationIndex = 0, path}) {
        return this.app.getPublicKey(`${index}`).then(data => {
            return {
                address: zcrypto.toBech32Address(zcrypto.getAddressFromPublicKey(data.publicKey)),
                pubKey: data.publicKey
            };
        });
    }

    signTransaction({index, txRaw}) {
        console.log({index, txRaw}, JSON.stringify(txRaw));
        return this.app.signTxn(index, txRaw);
    }

    getInfo() {
        return this.app.getVersion();
    }
}