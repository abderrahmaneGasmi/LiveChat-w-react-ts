const crypto = require("crypto");

exports.sendstatus = (res, statuscode = 401, errormsg) => {
  res.status(statuscode).json({ response: errormsg });
};

exports.generateRandomBytes = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject(err);
      const buffString = buff.toString("hex");

      console.log(buffString);
      resolve(buffString);
    });
  });
};

exports.HandleNotFound = (req, res) => {
  this.sendstatus(res, 404, "this Page Doesnt exist");
};
