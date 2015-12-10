var ohauth = require('ohauth');

function oauthRequest(options, callback) {
  var requiredParams = ['url', 'consumerKey', 'consumerSecret'];
  var missingParams = [];

  requiredParams.forEach(function (requiredParam) {
    if (!(requiredParam in options)) {
      missingParams.push(requiredParam);
    }
  });

  if (missingParams.length > 0) {
    callback('Missing required parameter(s): ' + missingParams.join(', '));
    return;
  }

  var method = (options.method || 'GET').toUpperCase();
  var qs = options.qs || {};

  var auth = ohauth.headerGenerator({
    consumer_key: options.consumerKey,
    consumer_secret: options.consumerSecret
  });

  options.headers = options.headers || {};
  options.headers['Authorization'] = auth(method, options.url, qs);

  var request = (typeof REQUEST === 'undefined' ? require('request') : REQUEST);

  request(options, callback);
}

module.exports = oauthRequest;
