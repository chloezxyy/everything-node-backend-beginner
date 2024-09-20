const express = require("express");
const path = require("path");
const app = express();

// Set up static and middleware
// to get the resources, similar to what we did for the http module - express will set up the path, status code, mime types etc
app.use(express.static("./public"));

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
// });

app.all("*", (res, req) => {
  res.send("<h1>Page not found</h1>");
});

app.listen(5000, () => {
  console.log("server listening @ 5000");
});
