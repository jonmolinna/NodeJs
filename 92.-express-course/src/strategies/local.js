const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../schemas/User");
const { comparePassword } = require("../utils/helpers");

passport.serializeUser((user, done) => {
  // console.log("SERIALIZE", user);
  // Almacenas que datos de usuarios
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // datos guardados para todas las rutas
  // console.log("YOOOOO DESERIA", id);
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    // console.log({ email, password });

    try {
      if (!email && !password) {
        throw new Error("Bad request. Missing credentials");
      }

      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const isValidPassword = comparePassword(password, user.password);
      if (isValidPassword) {
        done(null, user); // user va a serializeUser
      } else {
        done(null, null);
      }
    } catch (err) {
      done(err, null);
    }
  })
);
