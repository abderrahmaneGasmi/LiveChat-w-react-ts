const multer = require("multer");
const { sendstatus } = require("../util/helper");
const pathFile = "./uploads";
var storage = multer.diskStorage({
  destination: pathFile,
  filename: function (req, file, cb) {
    let unic = Date.now() + "-" + Math.floor(Math.random() * 1000);
    let name = req.body.username;
    let exe =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    cb(null, unic + "." + exe);
  },
});
const ImageFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb("Supported only image files", false);
  }
  cb(null, true);
};
exports.uploadImage = multer({ storage, fileFilter: ImageFilter });
