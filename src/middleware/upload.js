import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    req.body.image = `http://${req.hostname}:${process.env.PORT}/uploads/${file.filename}`;
    req.body.images = req.files;
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
export const upload = multer({ storage: storage });
