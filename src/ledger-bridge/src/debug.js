let debug = false;

export const setDebug = (value) => {
    debug = value;
}

export const log = (...params) => {
    if (debug) {
        console.log('LedgerBridge', ...params);
    }
}