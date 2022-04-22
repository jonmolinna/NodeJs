const passport = require("passport");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

// GET Home Page
router.get("/", function (req, res, next) {
  res.status(200).json({ msg: "Hello World" });
});

// Register
router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user, // req.user => es un parametro que se incluye en el passport
    });
  }
);

// Login
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    // console.log("USER", user);
    try {
      if (err || !user) {
        // console.log("ERROR1", err);
        const error = new Error("new Error, <<<<<");
        return next(error);
      }

      // req.login => parametro que viene con passport
      req.login(user, { session: false }, async (err) => {
        // console.log("ERROR2", err);
        if (err) return next(err);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "JWT_SECRET");
        return res.json({ token });
      });
    } catch (err) {
      // console.log("ERROR TRY", err);
      return next(err);
    }
  })(req, res, next);
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      message: "You did it!",
      user: req.user,
      token: req.query.secret_token,
    });
  }
);

module.exports = router;
