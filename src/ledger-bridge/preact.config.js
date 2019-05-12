import asyncPlugin from 'preact-cli-plugin-fast-async';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { resolve } from 'path';

export default (config) => {
    asyncPlugin(config);
    config.output.publicPath = '/ledger-bridge/'

    config.node.process = 'mock';
    config.node.Buffer = true;

    // // overwrite manifest.json
    // config.plugins.unshift(
    //     new CopyWebpackPlugin([
    //         {
    //             from: resolve(process.cwd(), 'src', 'manifest.json'),
    //             to: 'manifest.json'
    //         }
    //     ])
    // );
}