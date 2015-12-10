var ohauth = require('ohauth');

function oauthRequest(options, callback) {
  var auth = ohauth.headerGenerator({
    consumer_key: options.consumerSecret,
    consumer_secret: options.tokenSecret
  });

  options.headers = options.headers || {};
  options.headers['Authorization'] = auth(options.method || 'GET', options.url, options.qs || {});

  var request = (typeof REQUEST === 'undefined' ? require('request') : REQUEST);

  request(options, callback);
}

module.exports = oauthRequest;
