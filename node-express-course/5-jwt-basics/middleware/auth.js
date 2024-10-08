const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("No token provided");
  }

  // E.g. Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJqb2huIiwiaWF0IjoxNzI4MzY4NDAyLCJleHAiOjE3MzA5NjA0MDJ9.mA_gKT7T3-zQiPWlnaFeCPOI7Xc7Tk1qW5RktU-B5H4
  const token = authHeader.split(" ")[1]; // get the second value

  // check if token is valid
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    // if token is invalid, jwt.verify will throw an error
    throw new UnauthenticatedError("No token provided");
  }
};

module.exports = authenticationMiddleware;
