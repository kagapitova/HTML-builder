const fs = require('fs');
const path = require('path')
const { stdin, stdout } = process
let result = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8')

process.stdout.write('\nEnter "exit" or press Ctrl+C to exit\n' + 'Hello!Enter your text below:\n');
stdin.on('data', (data) => {
    data = data.toString().toLowerCase().trim()
    if (data === 'exit') {
        process.exit()
    } else {
        result.write(data)
    }
})

process.on('SIGINT', () => {
    process.exit()
});

process.on('exit', () => {
    stdout.write('\n File is ready! Good bye!')
});

process.on('error', (error) => {
    stdout.write('\n Something wrong!')
    console.log(error.message);
});