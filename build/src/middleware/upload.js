"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, _path["default"].join(__dirname, "../public/uploads"));
  },
  filename: function filename(req, file, cb) {
    req.body.image = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/uploads/").concat(file.filename);
    req.body.images = req.files;
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  }
});
var filterImage = function filterImage(req, file, cb) {
  var ext = _path["default"].extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    req.flash("error__message", "Required file is .jpg || .gif || .jpeg");
    return cb("Required file is .jpg || .gif || .jpeg", false);
  }
  cb(null, true);
};
var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: filterImage
});
exports.upload = upload;