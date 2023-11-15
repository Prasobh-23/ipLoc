#!/usr/bin/env node
/* eslint-disable node/shebang */

const command = require('./index');

const arg = process.argv[2];
if (arg) {
  command.getLocation(arg);
} else {
  command.connectionChecker();
}
