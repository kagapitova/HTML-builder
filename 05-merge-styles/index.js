const fs = require('fs');
const path = require('path');

let startDirectory = path.join(__dirname, 'styles');
let copyDirectory = path.join(__dirname, 'project-dist');
let newFile = path.join(copyDirectory, 'bundle.css');
let textNewFile = fs.createWriteStream(newFile);
fs.readdir(startDirectory, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.log(err.message)
    }
    for(const file of files) {
        const filePath = path.join(startDirectory, file.name);
        if (file.isFile() && path.extname(file.name) === '.css') {
            fs.createReadStream(filePath).pipe(textNewFile);
        }
    }
});
