import EthApp from '@ledgerhq/hw-app-eth';

export class Eth {
    constructor(transport) {
        this.app = new EthApp(transport);
    }

    getPath(index, derivationIndex, path) {
        switch (path) {
            case 'legacy':
                return `44'/60'/${index}'/${derivationIndex}`;
            case 'live':
            default:
                return `44'/60'/${index}'/0/${derivationIndex}`;
        }
    }

    /**
     * @param {number} index index of account
     * @param {number} derivationIndex index of derivation for an account
     * @param {number} path derivation path, values accepted: live, legacy
     */
    getAddress({index, derivationIndex = 0, path}) {
        return this.app.getAddress(this.getPath(index, derivationIndex, path));
    }

    signTransaction({index, derivationIndex, path, txRaw}) {
        return this.app.signTransaction(this.getPath(index, derivationIndex, path), txRaw);
    }

    getInfo() {
        return this.app.getAppConfiguration();
    }
}