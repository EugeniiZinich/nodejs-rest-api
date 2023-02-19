const {
  listContacts,
  getContactId,
  deleteContact,
  addContact,
  updateById,
} = require("../models/contacts");

const { ctrlWrapper, HttpError } = require("../helpers");

const getAllContacts = async (req, res) => {
  const contacts = await listContacts();
  if (!contacts) {
    throw HttpError(404, "Not Found");
  }
  return res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const finedContact = await getContactId(contactId);

  if (!finedContact) {
    throw HttpError(404, "Not Found");
  }

  return res.json(finedContact);
};

const createContact = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const data = req.body;

  const result = await updateById(contactId, data);

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await deleteContact(contactId);

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json({ message: "Delete success", remove: result.deletedContact });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};
