const validateBody = require("./validateBody");
const validId = require("./itsValidId");
const validateFavorite = require("./validateFavorite");
const authenticate = require("./authenticate");
const cloudUpload = require("./avatarUpload");
const passport = require("./google-auth");

module.exports = {
  validateBody,
  validId,
  validateFavorite,
  authenticate,
  cloudUpload,
  passport,
};
