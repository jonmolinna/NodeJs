const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtraJWT = require("passport-jwt").ExtractJwt;
const User = require("../schemas/User");

passport.use(
  "login",
  new localStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("User not found");
        }

        if (password !== user.password) {
          throw new Error("Password incorrect");
        }

        return done(null, user);
      } catch (err) {
        // console.log(err.message);
        done(err.message, null);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: "JWT_SECRET",
      jwtFromRequest: ExtraJWT.fromAuthHeaderAsBearerToken(),
    },
    async (jwt_payload, done) => {
      try {
        return done(null, jwt_payload.user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);
