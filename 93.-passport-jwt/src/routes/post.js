const { Router } = require("express");
const Posts = require("../schemas/Posts");
const passport = require("passport");

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // console.log("YOOO", req.user); req.user => passport
    try {
      const posts = await Posts.find({ user: req.user._id }).populate(
        "user",
        "username"
      );
      res.status(200).json(posts);
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: err.message });
    }
  }
);

// router.get("/", async (req, res) => {
//   try {
//     const posts = await Posts.find().populate("user", "username");
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(400).json({ msg: err.message });
//   }
// });

router.post("/", async (req, res) => {
  const { title, comment, user } = req.body;
  try {
    const post = await Posts.create({ title, comment, user });

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
