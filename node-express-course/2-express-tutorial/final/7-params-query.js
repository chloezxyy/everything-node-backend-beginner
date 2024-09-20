// Params, Query String - Setup

const express = require("express");
const app = express();
const { products } = require("../data");

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1><a href='/api/products'>products</a>");
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { name, id, image } = product;
    return { name, id, image };
  });
  return res.json(newProducts);
});

app.get("/api/products/:productId", (req, res) => {
  const { productId } = req.params; // this is a route param
  const singleProduct = products.find(
    (product) => product.id === Number(productId),
  );
  if (!singleProduct) {
    return res.status(404).send("Product does not exist");
  }
  return res.json(singleProduct);
});

app.get("/api/products/:productId/reviews/:reviewId", (req, res) => {
  console.log(req.params);
  res.send("Hello World");
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products]; // we copy it into a new array so that we don't mutate the original product list

  // search in product list
  // if search is a valid param
  if (search) {
    // filter the array to only return the product name that matches search
    sortedProducts = sortedProducts.filter((product) =>
      product.name.startsWith(search),
    );
  }

  // if limit is a valid param
  if (limit) {
    // return the first x results from the list
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  // this check if there is a search result
  if (sortedProducts.length < 1) {
    // res.send("No products match your search");
    return res.status(200).json({
      success: true,
      data: [],
    });
  }
  return res.status(200).json(sortedProducts);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});

/* This errpr means that we're sending res one after another. To counter this, we use `return`
 * Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
 * */
