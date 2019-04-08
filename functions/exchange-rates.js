const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request-promise-native');

const exchangeRates = functions.https.onRequest(async function(req, res) {
    const ratesRef = admin.database().ref('/wallet/exchangeRates');
    const rates = (await ratesRef.once('value')).val();

    const ratesSettings = rates.settings;
    const lastUpdate = (rates.data || {}).lastUpdate || 0;
    
    let responseData = rates.data;
    if (Date.now() - lastUpdate > 60000) {
        // do update
        const endpoint = `https://min-api.cryptocompare.com/data/pricemulti?api_key=${ratesSettings.apiKey}&fsyms=${ratesSettings.from.toUpperCase()}&tsyms=${ratesSettings.to.toUpperCase()}`;
        try {
            let data = JSON.parse(await request.get(endpoint));
            
            if (data.Response && data.Response === 'Error') {
                //throw new Error('Generic error');
                console.error({
                    endpoint,
                    response: data
                });
            } else {
                responseData = Object.assign({}, data, {lastUpdate: Date.now()});
                await ratesRef.set(Object.assign({}, rates, {data: responseData}));
            }
        } catch(error) {
            console.error({
                endpoint,
                response: data,
                error
            });
        }   
    }

    res.send(responseData);
});

module.exports = {
    exchangeRates
}