import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    req.body.image = `http://${req.hostname}/uploads/${file.filename}`;
    req.body.images = req.files;
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const filterImage = function (req, file, cb) {
  var ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    req.flash("error__message", "Required file is .jpg || .gif || .jpeg");
    return cb("Required file is .jpg || .gif || .jpeg", false);
  }
  cb(null, true);
};

export const upload = multer({
  storage: storage,
  fileFilter: filterImage,
});
