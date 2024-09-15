// synchronous
const { readFileSync, writeFileSync } = require('fs')
const first = readFileSync('./content/first.txt', 'utf8')
const second = readFileSync('./content/second.txt', 'utf8')

// this line will create a file if it doesn't exist, and write the content to it - the flag 'a' is for append
writeFileSync('./content/result-sync.text', `Here is the result: ${first}, ${second}`, {flag : 'a'})

console.log('done with this task')
console.log('starting the next one')