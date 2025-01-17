const controls = require("./contacts");
const auth = require("./auth");

module.exports = {
  getAllContacts: controls.getAllContacts,
  getContactById: controls.getContactById,
  createContact: controls.createContact,
  updateContact: controls.updateContact,
  updateFavorite: controls.updateFavorite,
  removeContact: controls.removeContact,
  register: auth.register,
  login: auth.login,
  getCurrent: auth.getCurrent,
  logout: auth.logout,
  updateSubscription: auth.updateSubscription,
  updateAvatar: auth.updateAvatar,
  verifyEmail: auth.verifyEmail,
  resendVerifyEmail: auth.resendVerifyEmail,
  googleAuth: auth.googleAuth,
  googleRedirect: auth.googleRedirect,
  updateName: auth.updateName,
};
