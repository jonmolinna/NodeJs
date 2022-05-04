const { Router } = require("express");
const passport = require("passport");
const User = require("../schemas/User");
const { hashPassword, comparePassword } = require("../utils/helpers");

const router = Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  // console.log("Logged In");
  res.send(200);
});

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const isUserExist = await User.findOne({ $or: [{ username }, { email }] });
  if (isUserExist) {
    res.status(400).json({ msg: "User already exists!" });
  } else {
    const hashedPassword = hashPassword(password);
    await User.create({ username, password: hashedPassword, email });
    res.status(200).json({ msg: "User created" });
  }
});

// Discord
router.get("/discord", passport.authenticate("discord"), (req, res) => {
  res.send(200);
});

router.get(
  "/discord/redirect",
  passport.authenticate("discord"),
  (req, res) => {
    res.send(200);
  }
);

module.exports = router;

// Login with Session 2
// router.post("/login", async (request, response) => {
//   const { email, password } = request.body;
//   if (!email && !password) return response.send(400);

//   const user = await User.findOne({ email });
//   if (!user) return response.send(401);

//   const isValidPassword = comparePassword(password, user.password);
//   if (isValidPassword) {
//     request.session.user = user;
//     return response.send(200);
//   } else {
//     return response.send(401);
//   }
// });

// Login with Session 1
// router.post("/login", (request, response) => {
//   const { username, password } = request.body;
//   console.log(request.session);

//   if (username && password) {
//     if (request.session.user) {
//       console.log("Ya estas logeado");
//       response.send(request.session.user);
//     } else {
//       request.session.user = {
//         username,
//       };
//       console.log("Logeandose");
//       response.send(request.session);
//     }
//   } else {
//     response.send(404);
//   }
// });
