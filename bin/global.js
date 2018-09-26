#!/usr/bin/env node

const check = require('../src/index.js').default;
const program = require('commander');

program
  .version('0.0.1')
  .description('This tool can check whether the provided webpage has the proper headers to help prevent Clickjacking for a limited set of browsers')
  .arguments('<url>')
  .action(function(url){
    url_to_check = url;
  });
 
program.parse(process.argv);
 
if (typeof url_to_check === 'undefined') {
  console.error('no URL provided!');
  process.exit(1);
}

check(url_to_check);