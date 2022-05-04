const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

const routerGroceries = require("./routes/groceries");
const routerMarkets = require("./routes/markets");
const routerAuth = require("./routes/auth");
require("./database");
require("./strategies/local");

const app = express();
const PORT = 9000;

// Middleware
// Son funciones que se ejecutan antes de ingresar a la ruta (req, res, next)
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
  session({
    secret: "SNANJNJNjnjamskwenn123KDNSJDNNL",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use("/api/groceries", routerGroceries);
app.use("/api/markets", routerMarkets);
app.use("/api/auth", routerAuth);

app.listen(PORT, () => console.log(`Running express server on port ${PORT}`));
