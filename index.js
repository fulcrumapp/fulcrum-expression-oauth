var oauthSignature = require('oauth-signature');
var merge = require('merge');

function timestamp() {
  return ~~((+new Date()) / 1000);
}

function nonce() {
  for (var o = ''; o.length < 32;) {
    o += '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'[Math.floor(Math.random() * 61)];
  }
  return o;
}

function oauthRequest(options, callback) {
  var requiredParams = ['url', 'consumerSecret', 'tokenSecret'];
  var missingParams = [];

  requiredParams.forEach(function (requiredParam) {
    if (!(requiredParam in options)) {
      missingParams.push(requiredParam);
    }
  });

  var method = (options.method || 'GET').toUpperCase();
  var url = options.url;
  var consumerSecret = options.consumerSecret;
  var tokenSecret = options.tokenSecret;

  if (missingParams.length > 0) {
    callback('Missing required parameter(s): ' + missingParams.join(', '));
    return;
  }

  var parameters = {
    oauth_consumer_key: consumerSecret,
    oauth_token: tokenSecret,
    oauth_nonce: nonce(),
    oauth_timestamp: timestamp(),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0'
  };

  if (options.qs) {
    merge(parameters, options.qs);
  }

  var signature = oauthSignature.generate(method, url, parameters, consumerSecret, tokenSecret, { encodeSignature: true});

  var oauthHeader = 'OAuth oauth_consumer_key="' + consumerSecret + '",oauth_nonce="' + parameters.oauth_nonce + '",oauth_signature_method="' + parameters.oauth_signature_method + '",oauth_timestamp="' + parameters.oauth_timestamp + '",oauth_version="' + parameters.oauth_version + '",oauth_signature="' + signature + '"';
  var headers = {
    'Authorization': oauthHeader
  };

  var requestOptions = {
    url: url,
    method: method,
    headers: headers
  };

  if (options.qs) {
    requestOptions.qs = options.qs;
  }

  // r = REQUEST;
  r = require('request');

  console.log(requestOptions)
  r(requestOptions, callback);
}

module.exports = oauthRequest;
