exports.USER_AGENTS_TESTING_POOL = [
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11",                             // Chrome 23
  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",                           // Chrome 65
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8",                    // Safari 11
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8) AppleWebKit/536.25 (KHTML, like Gecko) Version/6.0 Safari/536.25",                            // Safari 6
  "Mozilla/5.0 (Windows NT 5.1; rv:7.0.1) Gecko/20100101 Firefox/7.0.1",                                                                      // Firefox 7
  "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0",                                                                 // Firefox 54
  "Mozilla/5.0 (Windows NT 6.3; Win64; x64; Trident/7.0; rv:11.0) like Gecko",                                                                // IE 11
  "Mozilla/5.0 (Windows NT 6.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36 OPR/52.0.2871.99",      // Opera 52
  "Opera/9.80 (X11; Linux zvav; U; en) Presto/2.8.119 Version/11.10",                                                                         // Opera 11
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/19.60136",                     // Edge 44
  "Mozilla/5.0 (SMART-TV; Linux; Tizen 2.4.0) AppleWebkit/538.1 (KHTML, like Gecko) SamsungBrowser/1.1 TV Safari/538.1"                       // Samsung Browser 1.1
];

const CSP_SUPPORTING_BROWSER_VERSIONS = {
  "Chrome": "40.0",
  "Safari": "10.0",
  "Firefox": "33.0",
  "Opera": "26.0",
  "Edge": "15.0",
  "Samsung Internet": "0"
};

const BASIC_X_FRAME_OPTIONS_SUPPORTING_BROWSER_VERSIONS = {
  "Chrome": "4.1.250",
  "Safari": "4.0",
  "Firefox": "3.6.9",
  "Opera": "10.50",
  "Edge": "13.10122",
  "IE": "8.0",
  "Samsung Internet": "0"
};

const SAMEORIGIN_X_FRAME_OPTIONS_SUPPORTING_BROWSER_VERSIONS = {
  "Chrome": "61.0",
  "Safari": "4.0",
  "Firefox": "3.6.9",
  "Opera": "48.0",
  "IE": "8.0",
  "Samsung Internet": "0"
};

const ALLOW_FROM_X_FRAME_OPTIONS_SUPPORTING_BROWSER_VERSIONS = {
  "Chrome": false,
  "Safari": false,
  "Firefox": "3.6.9",
  "IE": "8.0",
  "Samsung Internet": false
};

exports.csp_supportive_browser_version = (browser_family_name) => {
  return CSP_SUPPORTING_BROWSER_VERSIONS[browser_family_name] || undefined;
};

exports.x_frame_supportive_browser_version = (browser_family_name) => {
  return BASIC_X_FRAME_OPTIONS_SUPPORTING_BROWSER_VERSIONS[browser_family_name] || undefined;
};

exports.sameorigin_x_frame_supportive_browser_version = (browser_family_name) => {
  return SAMEORIGIN_X_FRAME_OPTIONS_SUPPORTING_BROWSER_VERSIONS[browser_family_name] || undefined;
};

exports.allow_from_x_frame_supportive_browser_version = (browser_family_name) => {
  return ALLOW_FROM_X_FRAME_OPTIONS_SUPPORTING_BROWSER_VERSIONS[browser_family_name] || undefined;
};