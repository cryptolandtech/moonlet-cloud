const functions = require('firebase-functions');
const admin = require('firebase-admin');

const { exchangeRates } = require('./exchange-rates');
const { wpProxy } = require('./wpProxy');
const { getFeaturesConfig } = require('./features-config');

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp(functions.config().firebase);

module.exports = {
    exchangeRates,
    wpProxy,
    getFeaturesConfig
};
