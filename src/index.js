const is_url_valid = require('./lib/urls').is_url_valid;
const test_runner = require('./lib/test_runner').default;

const check_clickjack = (url, cookies) => {
  try {
    is_url_valid(url);
    test_runner(url, cookies);
  }
  catch (error) {
    console.error(error);
  }
};

exports.default = check_clickjack;