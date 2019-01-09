const fs = require('fs');
const { Client } = require('pg');
const client = new Client();

const rstream = fs.createReadStream('./data.txt',{encoding:'utf8'});