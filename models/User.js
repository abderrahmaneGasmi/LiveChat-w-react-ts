const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: "String",
      required: true,
    },
    password: {
      type: "String",
      required: true,
    },
    image: {
      type: "String",
      required: true,
    },
    connected: {
      type: "Boolean",
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
