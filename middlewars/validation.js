const { RequestError } = require("../helpers");

const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(RequestError(error, "Missing required name field"));
    }
    next();
  };
};

module.exports = validation;
