// steams are used to read and write sequentially
// steams extends the event emitter class
// steams are useful for large amt of data, such as files/network connections where you dont want to load everything into memory


const { createReadStream } = require('fs')

// this means that we will read by chunks of 90000 bytes and the remaining of the file will be read in the last chunk
const stream = createReadStream('./content/big.txt', { highWaterMark: 90000, encoding: 'utf8' })

// This reads data in chunks
stream.on('data', (result) => {
    console.log(result)
})

stream.on('error', (err) => {
    console.log(err)
})