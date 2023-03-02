const { Contact } = require("../models/contact");

const { ctrlWrapper, HttpError } = require("../helpers");

const getAllContacts = async (_, res) => {
  const contacts = await Contact.find();
  if (!contacts) {
    throw HttpError(404, "Not Found");
  }
  return res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  // const finedContact = await Contact.findOne({ _id: contactId });
  const finedContact = await Contact.findById(contactId);

  if (!finedContact) {
    throw HttpError(404, "Not Found");
  }

  return res.json(finedContact);
};

const createContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const data = req.body;

  const result = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  }); // if l wont see new object, need add { new: true }, otherwise l will see old contact

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;

  const data = req.body;

  const result = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json({ status: 200, data: result });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

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
  updateFavorite: ctrlWrapper(updateFavorite),
  removeContact: ctrlWrapper(removeContact),
};
