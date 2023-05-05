const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const validateFavorite = require("./validateFavorite");
const authenticate = require("./authenticate");
const cloudUpload = require("./avatarUpload");
const passport = require("./google-auth");

module.exports = {
  validateBody,
  isValidId,
  validateFavorite,
  authenticate,
  cloudUpload,
  passport,
};
