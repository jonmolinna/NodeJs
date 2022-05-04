const mongoose = require("mongoose");

// DB Config
const mongoURI = "mongodb://localhost/express_curso";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected DB"))
  .catch((err) => console.log(err));
