const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select("name price");
  res.status(200).json({ products, nHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true";
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  // console.log({ queryObject });
  let results = Product.find(queryObject); // without `await` it returns a query object

  if (sort) {
    const sortList = sort.split(",").join(" ");
    results = results.sort(sortList);
  } else {
    // default sorting - based on the time that it was created
    results = results.sort("createdAt");
  }
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    results = results.select(fieldList);
  }
  const products = await results; // here with `await`, it returns an array of products
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
