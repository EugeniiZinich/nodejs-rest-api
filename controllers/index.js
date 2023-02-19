const controls = require("./contacts");

module.exports = {
  getAllContacts: controls.getAllContacts,
  getContactById: controls.getContactById,
  createContact: controls.createContact,
  updateContact: controls.createContact,
  removeContact: controls.removeContact,
};
