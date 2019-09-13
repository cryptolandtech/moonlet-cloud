const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

const Env = {
    LOCAL: 'local',
    STAGING: 'staging',
    PRODUCTION: 'production'
};

const FEATURES_CONFIG = {
    cloudBackup: [
        {
            dimensions: {
                env: [Env.LOCAL, Env.STAGING]
            },
            active: true
        }
    ],
    hwWallet: [
        {
            dimensions: {
                env: [Env.PRODUCTION, Env.LOCAL, Env.STAGING]
            },
            active: true
        }
    ],
    sendPageNameResolution: [
        {
            dimensions: {
                env: [Env.PRODUCTION],
                // testnet: true
            },
            active: true
        },
        {
            dimensions: {
                env: [Env.LOCAL, Env.STAGING]
            },
            active: true
        }
    ]
};

const getFeaturesConfig = functions.https.onRequest(async function(req, res) {
    cors(req, res, () => {});
    res.send(FEATURES_CONFIG);
});

module.exports = {
    getFeaturesConfig
}