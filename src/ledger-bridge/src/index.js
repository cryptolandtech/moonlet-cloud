import 'babel-polyfill';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import { Eth } from './apps/eth';

const apps = {Eth};
const appsInstances = {};
let transport;

const getTransport = async () => {
    if (!transport) {
        transport = await TransportU2F.create();
    }
    return transport;
}

const getApp = async (name) => {
    if (!apps[name]) {
        return null;
    }

    if (!appsInstances[name]) {
        const t = await getTransport();
        appsInstances[name] = new apps[name](t);
    } 
    return appsInstances[name];
}

const sendResponse = (origin, data, response) => {
    const msg = Object.assign({}, data, {type: 'ledger-bridge-response'}, response);
    // console.log(msg);
    window.top.postMessage(msg, origin);
}

window.addEventListener('message', async ({origin, data}) => {
    try {
        if (typeof data === 'object' && data.type === 'ledger-bridge' && apps[data.app]) {
            // console.log(origin, data);
            const app = await getApp(data.app);
    
            if (app) {
                if (typeof app[data.action] === 'function') {
                    transport.setExchangeTimeout(data.timeout || 30000);                    

                    const response = await app[data.action](data.params);
                    sendResponse(origin, data, {response});
                } else {
                    // app doesn't support action
                    sendResponse(origin, data, {error: 'ACTION_NOT_SUPPORTED'});    
                }
            } else {
                // app not supported
                sendResponse(origin, data, {error: 'APP_NOT_SUPPORTED'});
            }
        } 
    } catch (error) {
        // error caught 
        sendResponse(origin, data, {error: error.message});
    }
});

window.top.postMessage({type: 'ledger-bridge-ready'}, '*');