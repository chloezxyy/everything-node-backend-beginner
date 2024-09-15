// where streams come in handy

// for even bigger files we can use streams - http

var http = require('http');
var fs = require('fs');

http.createServer(function (req, res ) {
    // This code sends the entire data at once over the wire. This is not efficient for large files
    // const text = fs.readFileSync('./content/big.txt','utf8');
    // res.end(text);

    // This code sends the data in chunks. This is efficient for large files
    const fileStream = fs.createReadStream('./content/big.txt','utf8');
    fileStream.on('open', () => {
        // transfer-encoding: chunked
        fileStream.pipe(res); // pipe pushes the read stream to the write steam
    })

    fileStream.on('error', (err) => {
        res.end(err);
    })
})
.listen(5000);