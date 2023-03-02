const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendstatus } = require("../util/helper");
exports.isAuth = async (req, res, next) => {
  const token = req.headers?.auth;
  const JwtToken = token.split("Bearer ")[1] || null;
  if (!JwtToken) return sendstatus(res, 404, "No token Found");
  let decode;

  try {
    decode = jwt.verify(JwtToken, process.env.JWT);
  } catch (error) {
    let err = error?.message || error;
    return sendstatus(res, 404, err);
  }
  const { userId } = decode;
  let user = await User.findById(userId);
  if (!user) return sendstatus(res, 404, "Inavlid Token no user Found");

  req.user = user;
  next();
};
