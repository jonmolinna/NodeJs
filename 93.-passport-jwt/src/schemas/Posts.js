const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: mongoose.SchemaTypes.String,
  },
  comment: {
    type: mongoose.SchemaTypes.String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("posts", PostSchema);
