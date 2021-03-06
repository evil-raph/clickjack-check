const useragent = require('useragent');
const request = require('request');
const browsers = require('./browsers');

require('useragent/features');
require('console.table');

let report = {};

const build_report = (_useragent, test_data) => {
  let all_requests_finished = true;
  report[_useragent] = test_data;

  for (let i in browsers.USER_AGENTS_TESTING_POOL){
    all_requests_finished &= typeof(report[browsers.USER_AGENTS_TESTING_POOL[i]]) !== 'undefined';
  }

  if (all_requests_finished){
    console.log('done!\n');

    // Building table
    let report_table = [];

    for (let i in browsers.USER_AGENTS_TESTING_POOL){
      let protection_status = protection_check(
        browsers.USER_AGENTS_TESTING_POOL[i],
        report[browsers.USER_AGENTS_TESTING_POOL[i]]['content-security-policy'],
        report[browsers.USER_AGENTS_TESTING_POOL[i]]['x-frame-options']
      )
      report_table.push({
        'browser-family': report[browsers.USER_AGENTS_TESTING_POOL[i]]['browser-family'],
        'browser-version': report[browsers.USER_AGENTS_TESTING_POOL[i]]['browser-version'],
        'valid-protection-method': protection_status.method_of_protection,
        'protected': protection_status.protected
      });
    }

    // Printing out table
    console.table(report_table);

    // Printing out finishing screen
    console.log('\nYou can find more information regarding Clickjacking and browsers support defense mechanisms in the following adressess:');
    console.log('\t- Clickjacking defense cheat sheet: https://www.owasp.org/index.php/Clickjacking_Defense_Cheat_Sheet');
    console.log('\t- X-FRAME-OPTIONS compatibility sheet: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options');
    console.log('\t- Content Security Policy compatibility sheet: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors\n');
  }
};

const print_single_ua_info = (agent, csp, x_frame) => {
  // Browser Info
  console.log(agent.toJSON().family);
  console.log(agent.toVersion());

  // Browser support info
  console.log(browsers.check_support(agent));

  // Response Headers of Interest
  console.log('x-frame-options: {x_frame}'.replace('{x_frame}', x_frame));
  console.log('content-security-policy: {csp}'.replace('{csp}', csp));

  // Separator
  console.log('');
}

const protection_check = (_useragent, csp, x_frame) => {
  let protection_status = {
    protected: false,
    method_of_protection: ''
  };

  // parse user agent
  const agent = useragent.parse(_useragent);

  // Headers support intel
  const headers_support = browsers.check_support(agent);

  // Generate protected status
  if (headers_support.supports_csp && /^(.*)frame-ancestors (.*)$/.test(csp)) {
    protection_status.method_of_protection = 'csp: ' + csp;
    protection_status.protected = true;
  }
  else if (headers_support.supports_basic_x_frame && /^DENY$/.test(x_frame)){
    protection_status.method_of_protection = 'x_frame: ' + x_frame;
    protection_status.protected = true;
  }
  else if (headers_support.supports_sameorigin_x_frame && /^SAMEORIGIN$/.test(x_frame)){
    protection_status.method_of_protection = 'x_frame: ' + x_frame;
    protection_status.protected = true;
  }
  else if (headers_support.supports_allow_from_x_frame && /^ALLOW-FROM(.*)$/.test(x_frame)){
    protection_status.method_of_protection = 'x_frame: ' + x_frame;
    protection_status.protected = true;
  }
  else {
    console.log('Potential unprotected User Agent detected:');
    print_single_ua_info(agent, csp, x_frame)
  }

  return protection_status;
};

const test = (_useragent, url, cookie_header) => {
  request.get(url, {"rejectUnauthorized": false, headers: {'User-Agent': _useragent, 'Cookie': cookie_header}}, (err, r, b) => {
    if (err) {
      throw 'Something went wrong during tests';
      process.exit(1);
    }

    // User Agent parsing
    const agent = useragent.parse(_useragent);

    // Check if this is the last request. If so, build report.
    build_report(_useragent, {
      'browser-family': agent.toJSON().family,
      'browser-version': agent.toVersion(),
      'x-frame-options': r.headers['x-frame-options'],
      'content-security-policy': r.headers['content-security-policy']
    });
  });
}

exports.default = (url, cookies) => {
  // Cookie Header setting
  let cookie_header = cookies ? request.cookie(cookies) : '';

  // Initial request to check URL availability
  console.log('Checking URL availability...');
  request.get(url, {"rejectUnauthorized": false, headers: {'Cookie': cookie_header}}, (err, response, body) => {
    if (err) throw "We faced problems while trying to reach the provided URL. Please make sure it includes the access protocol and it's a valid and reachable url.";
    else console.log('done!\n');
    
    // Succesful response kickoff user agent specific tests
    console.log('Starting test requests for different User Agents...');
    for (let i in browsers.USER_AGENTS_TESTING_POOL){
      let user_agent = browsers.USER_AGENTS_TESTING_POOL[i];
      test(user_agent, url, cookie_header);
    }
  });
};