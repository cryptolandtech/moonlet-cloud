const scrape = require('website-scraper');
var evilDns = require('evil-dns');

// String match
evilDns.add('moonlet.xyz', '212.146.84.81');


const options = {
  urls: [
    'https://moonlet.xyz/',
    {url: 'https://moonlet.xyz/404.html', filename: '404.html'}
  ],
  directory: './website',
  recursive: true,
  prettifyUrls: true,
  filenameGenerator: 'bySiteStructure',
  urlFilter: function(url){
    return url.indexOf('https://moonlet.xyz') === 0 || url.indexOf('http://moonlet.xyz') === 0;
  }
};

scrape(options).then((result) => {
    console.log('Done!');
});