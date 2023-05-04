const fs = require('fs');
const path = require('path')
fs.readdir(path.join(__dirname, 'secret-folder'),{ withFileTypes : true }, (err, file) => {
    file.forEach((file, index) => {
        let filePath = path.join(__dirname, 'secret-folder', file.name)
        if (file.isFile()) {
            fs.stat(filePath, (err, statsInfo) => {
                let fileName = file.name.split('.')[0];
                let fileExtName = path.extname(file.name);
                let fileSize = Math.floor((statsInfo.size / 1024) * 100) / 100
                console.log(`Result: ${fileName} - ${fileExtName} - ${fileSize} kb`)
            })
        }
        if (err) {
            return console.log(err.message)
        }
    });
});
