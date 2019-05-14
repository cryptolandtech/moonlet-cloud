import asyncPlugin from 'preact-cli-plugin-fast-async';

export default (config) => {
    asyncPlugin(config);
    config.output.publicPath = '/ledger-bridge/'

    config.node.process = 'mock';
    config.node.Buffer = true;
}