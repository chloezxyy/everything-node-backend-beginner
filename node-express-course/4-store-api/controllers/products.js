const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    price: { $gt: 30 },
  })
    .sort("price")
    .select("name price");

  res.status(200).json({ products, nHits: products.length });
};

const getAllProducts = async (req, res) => {
  const {
    featured,
    company,
    name,
    sort,
    fields,
    page: pageRequested,
    limit: limitRequested,
    numericFilters,
  } = req.query;
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
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`,
    );
    console.log({ filters });

    const options = ["price", "rating"]; // these are the two properties that uses the number value
    filters = filters.split(",").forEach((item) => {
      // E.g., item = price-$gt-40
      // field = price, operator = $gt, value = 40
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

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

  const page = Number(pageRequested) || 1;
  const limit = Number(limitRequested) || 10;

  const skipped = (page - 1) * limit;

  results = results.skip(skipped).limit(limit);

  const products = await results; // here with `await`, it returns an array of products
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
