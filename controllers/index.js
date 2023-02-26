const controls = require("./contacts");

module.exports = {
  getAllContacts: controls.getAllContacts,
  getContactById: controls.getContactById,
  createContact: controls.createContact,
  updateContact: controls.createContact,
  updateFavorite: controls.updateFavorite,
  removeContact: controls.removeContact,
};
