/*
 * This sets up the server with just node.js http modules (no express.js)
 * But we have to manually handle the routing and the response and resources
 * */

const http = require("http");
const { readFileSync } = require("fs");

// get all files
const homePage = readFileSync("./navbar-app/index.html");
const homeStyles = readFileSync("./navbar-app/styles.css");
const homeImage = readFileSync("./navbar-app/logo.svg");
const homeLogic = readFileSync("./navbar-app/browser-app.js");

// this callback will be invoked everytime a user makes a request to the server
const server = http.createServer((req, res) => {
  const url = req.url;

  // homepage
  if (url === "/") {
    // http headers
    res.writeHead(200, { "content-type": "text/html" }); // 200 is the status code for a successful response; the second argument is an object containing the response headers
    res.write(homePage);

    // about page
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>About</h1>");
  }

  /* To make sure that these (js, css) resources will be available */
  // styles -- ?? why does this work?
  else if (url === "/styles.css") {
    // mime type
    res.writeHead(200, { "content-type": "text/css" });
    res.write(homeStyles);
  }
  // image/logo -- ??
  else if (url === "/logo.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.write(homeImage);
  }
  // js file
  else if (url === "/browser-app.js") {
    res.writeHead(200, { "content-type": "text.javascript" });
    res.write(homeLogic);
  } else {
    // 404 - error page
    res.writeHead(400, { "content-type": "text/html" });
    res.write("<h1>Page not found</h1>");
  }
  /* To make sure that these resources will be available */

  res.end(); // this .end() method signals to the server that all of the response headers and body have been sent; that server should consider this message complete
});

server.listen(5000);

// { 'content-type': 'text/html' } - we're passing the content of the file, not the file itself
