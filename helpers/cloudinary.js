const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: "due9wnjtm",
  api_key: "912223236835692",
  api_secret: "CS-VWlyCU_MhmK1-iLt4cvT19bc"
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'repaso', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;