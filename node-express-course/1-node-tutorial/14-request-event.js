const http = require("http")

// const server = http.createServer((req, res) => {
//     res.end('Welcome')
// })

// using Event Emitter API
const server = http.createServer()

// emit request event
//subscribe to it / listen for it / respond to it
server.on('request', (req, res) => {
    res.end('Welcome')
})

server.listen(5000);

// The commented out code handles requests directly within the createServer method - this is less flexible as the request handling logic is tied directly to the server creation
// The uncommented code uses the Event Emitter API to handle requests - flexible as it separates the request handling logic from the server creation