const app = require("express")(); // to invoke the express module, we need to call it as a function

/*
 * This is the same as the previous example in 2-http-app, but with express.js
 * */

app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

app.get("/about", (req, res) => {
  res.status(200).send("About Page"); // you can see the status code in the Network request tab
});

// this is a wild card route - it will match any route that hasn't been matched yet
app.use("*", (req, res) => {
  res.send("<h1>Page not found</h1>");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});

/*
 * By default all browsers make get requests
 * */

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen
