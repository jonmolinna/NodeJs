const { Router } = require("express");
const User = require("../schemas/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        throw err;
      }

      req.login(user, { session: false }, async () => {
        const body = { _id: user._id, username: user.username };
        const token = jwt.sign({ user: body }, "JWT_SECRET");
        return res.json({ token });
      });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  })(req, res, next);
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUserExist = await User.findOne({ username });
    if (isUserExist) {
      throw new Error("Username ya existe");
    }
    const user = await User.create({ username, password });
    res.status(200).json({ msg: "user register", user });
  } catch (err) {
    // console.log(err.name, err.message);
    return res.status(400).json({ error: err.message, name: err.name });
  }
});

module.exports = router;

// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const isUserExist = await User.findOne({ username });

//     if (!isUserExist) {
//       throw new Error("Credenciales Incorrectos");
//     }

//     if (password !== isUserExist.password) {
//       throw new Error("Credenciales Incorrectos");
//     }

//     res.status(200).json({ msg: "login successfuly" });
//   } catch (err) {
//     return res.status(400).json({ error: err.message });
//   }
// });

// ------------------throw
// try {
//   throw "I'm Evil";
//   console.log("You'll never reach to me", 123465);
// } catch (e) {
//   console.log(e); // I'm Evil
// }

// ------------------throw new Error
// try {
//   throw new Error("I'm Evil")
//   console.log("You'll never reach to me", 123465)
// } catch (e) {
//   console.log(e.name, e.message); // Error I'm Evil
// }
