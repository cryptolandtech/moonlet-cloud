const functions = require('firebase-functions');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer(); // See (†)

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    if(req.method=="POST" && req.body){
        proxyReq.write(req.body);
        proxyReq.end();
    }
});

const wpProxy = functions.https.onRequest(function(req, res) {
    proxy.web(req, res, { 
        target: 'https://212.146.84.81', 
        headers: {
            'Host': 'moonlet.xyz'
        } 
    });
});

module.exports = {
    wpProxy
}