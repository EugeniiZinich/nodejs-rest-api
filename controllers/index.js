const controls = require("./contacts");
const auth = require("./auth");

module.exports = {
  getAllContacts: controls.getAllContacts,
  getContactById: controls.getContactById,
  createContact: controls.createContact,
  updateContact: controls.createContact,
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
};
