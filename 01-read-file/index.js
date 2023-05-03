const fs = require('fs');
const path = require('path');
const textInput = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let data = '';
textInput.on('data', chunk => data += chunk);
textInput.on('end', () => console.log(data));