// Function to handle image uploads - we use multer

import multer from "multer";
import { getUploadDir } from "../../fileUtils.js";
import slugify from "slugify";

export const uploadImageFile = (path) => {
  const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  return multerStorage(path, whitelist);
};

function multerStorage(path, whitelist) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, getUploadDir(path));
    },
    filename: function (req, file, cb) {
      const name = slugify(file.originalname, { lower: true });
      cb(null, Date.now() + "-" + name);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error("File type is not allowed"));
    }
    cb(null, true);
  };

  return multer({ storage: storage, fileFilter: fileFilter });
}
