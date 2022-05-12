const express = require("express");
const passport = require("passport");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
require("./server");
require("./strategies/local");

const app = express();
const PORT = 9000;

// Middleware
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to Backend" });
});

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

app.listen(PORT, () => console.log("Running express server"));
