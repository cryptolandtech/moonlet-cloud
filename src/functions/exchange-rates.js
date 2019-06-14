const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request-promise-native');
const cors = require('cors')({origin: true});

const exchangeRates = functions.https.onRequest(async function(req, res) {
    cors(req, res, () => {});

    const ratesRef = admin.database().ref('/wallet/exchangeRates');
    const rates = (await ratesRef.once('value')).val();

    const ratesSettings = rates.settings;
    const lastUpdate = (rates.data || {}).lastUpdate || 0;
    
    let responseData = rates.data;
    if (Date.now() - lastUpdate > 60000) {
        // do update
        const endpoint = `https://min-api.cryptocompare.com/data/pricemulti?api_key=${ratesSettings.apiKey}&fsyms=${ratesSettings.from.toUpperCase()}&tsyms=${ratesSettings.to.toUpperCase()}`;
        try {
            let data = JSON.parse(await request.get(endpoint, {timeout: 2000}));
            
            if (data.Response && data.Response === 'Error') {
                //throw new Error('Generic error');
                console.error({
                    endpoint,
                    response: data
                });
            } else {
                Object.assign(responseData, data);
            }
        } catch(error) {
            console.error({
                endpoint,
                error
            });
        }   
    }

    responseData.lastUpdate = Date.now();
    await ratesRef.set(Object.assign({}, rates, {data: responseData}));
    res.send(responseData);
});

module.exports = {
    exchangeRates
}