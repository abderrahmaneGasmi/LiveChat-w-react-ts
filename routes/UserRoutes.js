const express = require("express");
const {
  CreateUser,
  getUser,
  testToken,
} = require("../controllers/UserController");
const { isAuth } = require("../middleware/loggedIn");
const router = express.Router();
const { uploadImage } = require("../middleware/Multer");
router
  .route("/")
  .get(getUser)

  .post(uploadImage.single("file"), CreateUser);
router.route("/isAuth").get(isAuth, testToken);
module.exports = router;
