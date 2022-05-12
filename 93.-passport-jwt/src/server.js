const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost/a_testing";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected DB"))
  .catch((err) => console.log(err));
