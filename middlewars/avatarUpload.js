const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configuration
require("dotenv").config();

const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const cloudUpload = (cloudOptions) => {
  const { fieldname, destFolder, transformation } = cloudOptions;
  // якщо папка призначення avatars то присвоюємо ім'я яке дорівнює id користувача
  //  встановлюємо overwrite: true щоб один і той самий користувач при зміні аватарки перезаписував старий файл
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
      const timestamp = Math.floor(Date.now() / 1000);
      const { _id } = req.user;
      const imageName =
        destFolder === "avatars" ? `${_id}` : `${_id}_${timestamp}`;

      return {
        folder: destFolder,
        public_id: imageName,
        allowed_formats: ["jpg", "jpeg", "png"],
        transformation: transformation,
        overwrite: true,
      };
    },
  });

  const fileFilter = (req, file, cd) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cd(null, true);
    } else {
      cd({ message: "Unsupported file format. Must be jpeg, png, jpg" }, false);
    }
  };

  const imageUpload = multer({
    storage,
    fileFilter: fileFilter,
  });

  return imageUpload.single(fieldname);
};

module.exports = cloudUpload;
