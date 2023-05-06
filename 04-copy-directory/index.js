const fs = require('fs');
const path = require('path');

function changeCopyHandler(directory) {
    let startDirectory = path.join(__dirname, directory);
    let copyDirectory = path.join(__dirname, directory + '-copy');
    fs.mkdir(copyDirectory, (err) => {
        if (err && err.code === 'EEXIST') {
            console.log('file-copy is created already!');
        } else {
            console.log('file-copy is created')
        }
        fs.readdir(copyDirectory, {withFileTypes: true}, (err, files) => {
            if (err) {
                console.log(err.message)
            }
            files.forEach(file => {
                fs.unlink(path.join(copyDirectory, file.name), err => {
                    if (err) {
                        console.log(err.message)
                    }
                })
            })
            fs.readdir(startDirectory, {withFileTypes: true}, (err, files) => {
                files.forEach((file) => {
                    fs.copyFile(path.join(startDirectory, file.name), path.join(copyDirectory, file.name), (err) => {
                        if (err) {
                            console.log(err.message)
                        }
                    })
                })
                if (err) {
                    console.log(err.message)
                }
            })
        })
    })
}

changeCopyHandler('files');
