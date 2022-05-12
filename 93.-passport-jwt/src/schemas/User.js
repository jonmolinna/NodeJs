const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: mongoose.SchemaTypes.String,
  },
  password: {
    type: mongoose.SchemaTypes.String,
  },
});

module.exports = mongoose.model("users", UserSchema);
