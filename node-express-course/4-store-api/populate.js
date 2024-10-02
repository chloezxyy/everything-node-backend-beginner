/*
 * to seed the database with data
 * */

require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts); // dynamically create products
    console.log("Success");
    process.exit(0); // to exit the process once it has been successful
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

start();
