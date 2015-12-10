var Factual = require('factual-api');
var credentials = require('./credentials');

var factual = new Factual(credentials.key, credentials.secret);

factual.get('/t/products-cpg-nutrition', {include_count: 't', q: '052000131512'}, function (error, response) {
  if (error) {
    return console.log('Error: ', error);
  }
  console.log(response);
});
