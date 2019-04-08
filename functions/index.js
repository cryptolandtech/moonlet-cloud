const { exchangeRates } = require('./exchange-rates');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp(functions.config().firebase);

module.exports = {
    exchangeRates
};
