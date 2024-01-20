const path = require('path');
const fs = require('fs');
const text = path.join(__dirname, 'text.txt');
const readS = fs.createReadStream(text, 'utf8');
readS.on('data', (chunk) => console.log(chunk));
