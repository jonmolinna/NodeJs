const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");

const app = express();
const PORT = 3000;

const mongoURI = "mongodb://localhost/passport-jwt";
mongoose.connect(mongoURI);
mongoose.connection.once("open", () => {
  console.log("DB Connected");
});

// Usando el Middleware
app.use(express.json());
require("./auth/auth");

// Rutas
app.use("/api", router);

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
