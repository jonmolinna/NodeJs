const passport = require("passport");
const { Strategy } = require("passport-discord");
const DiscordUser = require("../schemas/DiscordUser");

passport.serializeUser((user, done) => {
  console.log("YOOOO", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await DiscordUser.findById(id);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      clientID: "971420768577683506",
      clientSecret: "JgAg6b6g-1SpxN1p35ZMdmPzaCdW2eWQ",
      callbackURL: "http://localhost:9000/api/auth/discord/redirect",
      scope: ["identify"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log({ accessToken, refreshToken });
      console.log(profile);

      try {
        const discordUser = await DiscordUser.findOne({
          discordId: profile.id,
        });
        if (discordUser) {
          return done(null, discordUser);
        } else {
          const newUser = await DiscordUser.create({ discordId: profile.id });
          return done(null, newUser);
        }
      } catch (err) {
        console.log(err);
        return done(err, null);
      }
    }
  )
);
