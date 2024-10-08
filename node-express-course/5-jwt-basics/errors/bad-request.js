const CustomAPIError = require("./custom-error");

class BadRequestError extends CustomAPIError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
