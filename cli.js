#!/usr/bin/env node

let command = require('./index');

let arg = process.argv[2];
if (arg)
{command.getLocation(arg);
}else{
command.onCheck();
}
