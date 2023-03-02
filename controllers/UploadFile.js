const multer = require("multer");
const { sendstatus } = require("../util/helper");
const { uploadImage } = require("../middleware/Multer");
exports.uploadFile = async (req, res) => {
  // sendstatus(res, 200, "File uploaded successfully",);
  res.json({ msg: "File uploaded successfully", path: req.file.path });
};
