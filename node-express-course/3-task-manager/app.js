const express = require("express");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();
const tasks = require("./routes/tasks");
const connectDb = require("./db/connect");
require("dotenv").config();

// middleware to use json
app.use(express.json());
app.use(express.static("./public")); // to serve static folders

app.use(notFound);
app.use(errorHandlerMiddleware);

// routes
app.use("/api/v1/tasks", tasks);

const port = "3000";

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    // .then(() => console.log("Connected to the db"))
    // .catch((e) => console.log(e));
    app.listen(port, console.log(`Server is listening at ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();
