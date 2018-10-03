#!/usr/bin/env node

const check = require('../src/index.js').default;
const program = require('commander');

program
  .version('1.0.0')
  .description('This tool can check whether the provided webpage has the proper headers to help prevent Clickjacking for a limited set of browsers')
  .option('-v --verbose', 'Exhibits more detailed status during the test run')
  .option('-c --cookies <cookie_string>', 'set the provided cookie string in the headers of the testing requests')
  .arguments('<url>')
  .action(function(url){
    url_to_check = url;
  });
 
program.parse(process.argv);
 
if (typeof url_to_check === 'undefined') {
  console.error('no URL provided!');
  process.exit(1);
}

check(url_to_check, program.cookies, program.verbose);