// create a big file

const { writeFileSync } = require('fs') // fs - file stream

for (let i = 0; i < 1000; i++) {
    writeFileSync('./content/big.txt', `hello world ${i}\n`, {flag: 'a'})
}