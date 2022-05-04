const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const routerGroceries = require("./routes/groceries");
const routerMarkets = require("./routes/markets");
const routerAuth = require("./routes/auth");
require("./database");
// require("./strategies/local");
require("./strategies/discord");

const app = express();
const PORT = 9000;
// const memoryStore = new session.MemoryStore();

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
    // store: memoryStore, // La cokies almacena en la memoria
    // La cokies almacena en la base de datos
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/express_curso",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log("YOOOO", memoryStore);
//   next();
// });

// Rutas
app.use("/api/groceries", routerGroceries);
app.use("/api/markets", routerMarkets);
app.use("/api/auth", routerAuth);

app.listen(PORT, () => console.log(`Running express server on port ${PORT}`));
