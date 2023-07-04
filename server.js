const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(4000, () => {
      console.log("Server is running. Use our API on port: 4000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
