var oauthRequest = require('../');
var credentials = require('./credentials');

var options = {
  consumerSecret: credentials.key,
  tokenSecret: credentials.secret,
  url: 'http://api.v3.factual.com/t/products-cpg-nutrition',
  qs: {
    include_count: 't',
    q: '052000131512'
  }
}

oauthRequest(options, function (error, response) {
  if (error) {
    return console.log('Error: ', error);
  }
  console.log(response.body);
});
