const validateBody = require("./validateBody");
const validId = require("./itsValidId");
const validateFavorite = require("./validateFavorite");
const authenticate = require("./authenticate");
const upload = require("./upload");
const passport = require("./google-auth");

module.exports = {
  validateBody,
  validId,
  validateFavorite,
  authenticate,
  upload,
  passport,
};
