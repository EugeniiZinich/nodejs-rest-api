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

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "avatars",
  allowedFormats: ["jpg", "png"],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  // params: {
  //   folder: "uploads", // Папка, в которую будут загружаться изображения
  //   allowed_formats: ["jpg", "jpeg", "png"], // Разрешенные форматы файлов
  //   transformation: [{ width: 500, height: 500, crop: "limit" }], // Пример преобразования размера изображения
  // },
});

// Создаем экземпляр multer с использованием хранилища CloudinaryStorage
const uploadAvatar = multer({ storage: storage });

module.exports = uploadAvatar;

// const cloudUpload = (cloudOptions) => {
//   const { fieldName, destFolder, transformation } = cloudOptions;
//   // якщо папка призначення avatars то присвоюємо ім'я яке дорівнює id користувача
//   //  встановлюємо overwrite: true щоб один і той самий користувач при зміні аватарки перезаписував старий файл
//   const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: (req, file) => {
//       const timestamp = Math.floor(Date.now() / 1000);
//       const { _id } = req.user;
//       const imageName =
//         destFolder === "contactsAvatar" ? `${_id}` : `${_id}_${timestamp}`;

//       return {
//         folder: destFolder,
//         public_id: imageName,
//         allowed_formats: ["jpg", "jpeg", "png"],
//         transformation: transformation,
//         overwrite: true,
//       };
//     },
//   });

//   const fileFilter = (req, file, cd) => {
//     if (
//       file.mimetype === "image/jpeg" ||
//       file.mimetype === "image/png" ||
//       file.mimetype === "image/jpg"
//     ) {
//       cd(null, true);
//     } else {
//       cd({ message: "Unsupported file format. Must be jpeg, png, jpg" }, false);
//     }
//   };

//   const imageUpload = multer({
//     storage,
//     fileFilter: fileFilter,
//   });

//   return imageUpload.single(fieldName);
// };

// module.exports = cloudUpload;
