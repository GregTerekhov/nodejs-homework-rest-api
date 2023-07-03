const isDuplicated = ({ name, code }) =>
  name === "MongoServerError" && code === 11000;

const handleSchemaValidationErrors = (error, data, next) => {
  error.status = isDuplicated ? 409 : 400;
  next();
};

module.exports = handleSchemaValidationErrors;
