// check username, password in post (login) request
// if exists create new JWT
// send back to frontend

// setup authentication so only the request with JWT can access the /dashboard route

const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  // 3 options to check
  // 1. mongoose validation - db validation
  // 2. sits infront of our request - joi
  // 3. check in the controller

  // just for demo, usually provided by db
  const id = new Date().getDate();

  // try to keep the payload small - for better ux, and dont include sensitive data!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

// where we want to share our secret/authorized data
const dashboard = async (req, res) => {
  const luckyNumber = Math.random() * 99;
  res.status(200).json({
    msg: `Hellow, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
