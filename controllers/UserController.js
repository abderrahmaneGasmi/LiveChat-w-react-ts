const User = require("../models/User");
const { sendstatus } = require("../util/helper");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
exports.getUser = async (req, res, next) => {
  const { username, password } = req.query.data;
  if (!username) return sendstatus(res, 404, "there is no user found");
  if (!password) return sendstatus(res, 404, "there is no user found");

  const user = await User.findOne({ username, password });
  if (!user) {
    return sendstatus(res, 404, "there is no user found");
  }
  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT);

  return res.json({
    user,
    token: jwtToken,
  });
};

exports.CreateUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.file);
  let user = new User({
    username,
    password,
    image:
      "/" + req.file.path.split("\\")[0] + "/" + req.file.path.split("\\")[1],
  });
  let usertold = await User.findOne({ username });
  if (usertold != null) {
    return sendstatus(res, 401, "username already been used");
    // return res.json({ errorMsg: "email already been used" });
  }
  try {
    user = await user.save();
  } catch (error) {
    return sendstatus(res, 404, error);
  }
  if (user) {
    return sendstatus(res, 201, "User created successfully");
  } else {
    return sendstatus(res, 504, "fail You should Try later");
  }
};
exports.testToken = async (req, res) => {
  return res.json(req.user);
};
