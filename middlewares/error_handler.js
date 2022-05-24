const ErrorJson = require("../utils/ErrorJson");

function errorHandler(err, req, res, next) {
  const { message, status } = err;
  let error = { message, status };

  if (err.code === "ER_DUP_ENTRY") {
    // dublicated data
    const msg = "this item is already exist";
    error = new ErrorJson(msg, 400);
  }
  if (err.code === "ER_BAD_FIELD_ERROR") {
    error = new ErrorJson(err.message, 400);
  }

  if (err.name == "ValidationError") {
    const msg = err.message;
    error = new ErrorJson(msg, 400);
  }

  res.status(error.status || 500).json({
    success: false,
    msg: error.message || "server error , please try again later",
  });
}

module.exports = errorHandler;
