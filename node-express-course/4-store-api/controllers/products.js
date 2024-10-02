const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "e";
  const products = await Product.find({
    name: {
      $regex: search,
      $options: "i",
    },
    company: "ikea",
    featured: false,
  });
  res.status(200).json({ products, nHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
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
  console.log({ queryObject });
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
