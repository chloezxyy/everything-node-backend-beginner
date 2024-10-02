const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    name: "albany sectional",
  });
  res.status(200).json({ products, nHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = !!featured;
  }
  if (company) {
    queryObject.company = company;
  }

  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
