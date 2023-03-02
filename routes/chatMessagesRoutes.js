const express = require("express");
const {
  CreateChatMessage,
  getChatMessages,
} = require("../controllers/chatMessageController");
const { isAuth } = require("../middleware/loggedIn");
const router = express.Router();
router.route("/").get(isAuth, getChatMessages).post(isAuth, CreateChatMessage);
router.route("/get").get(getChatMessages);
module.exports = router;
