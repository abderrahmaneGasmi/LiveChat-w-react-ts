const { pretifyChatMessage } = require("../functions/pretifyObject");
const ChatMessage = require("../models/ChatMessage");
const { sendstatus } = require("../util/helper");
exports.CreateChatMessage = async (req, res) => {
  const message = req.body.data;
  if (!message) return sendstatus(res, 404, "message is required");

  let msg = new ChatMessage({
    username: req.user._id,
    message,
  });
  try {
    msg = await msg.save();
  } catch (error) {
    return sendstatus(res, 404, error);
  }
  if (msg) {
    return sendstatus(res, 201, "message created successfully");
  } else {
    return sendstatus(res, 504, "fail You should Try later");
  }
};
exports.getChatMessages = async (req, res, next) => {
  const messages = await ChatMessage.find().populate("username");

  if (!messages) {
    return sendstatus(res, 404, "there is no user found");
  }

  let data = [];
  messages.forEach((message) => {
    data.push(pretifyChatMessage(message));
  });
  return res.json(data);
};
