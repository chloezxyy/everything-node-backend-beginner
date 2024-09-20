/*
 * Middlewares are functions that execute during the request to the server
 *
 * For middlewares, we have to either terminate (sending your own response), or pass it on to the next middleware
 */

const express = require("express");
const app = express();
const { logger } = require("./logger");
const { authorize } = require("./authorize");
const morgan = require("morgan");

// req => middleware => res

// 1. app.use (to mount middleware at a specific path) vs app.route (create chainable route handlers)
// 2. options (for middlewares) ->
//  our own - this file
//  express - app.use(express.static("./public")); or
//  third party (morgan library) - https://www.npmjs.com/package/morgan

/*
 * The order matters here.
 * */
// app.use([logger, authorize]); // this middleware will run for every req
// app.use(express.static("./public"));

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.get("/api/product", (req, res) => {
  res.send("Products");
});

app.get("/api/items", (req, res) => {
  console.log(req.user);
  res.send("Items");
});

app.listen(5000, () => {
  console.log("Server is listening at port 5000");
});
