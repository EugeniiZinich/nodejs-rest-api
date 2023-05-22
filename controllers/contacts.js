const { Contact } = require("../models/contact");

const { ctrlWrapper, HttpError } = require("../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;

  if (favorite === "true") {
    const contacts = await Contact.find({ owner }, "-createdAt -updatedAt");

    const getFavorite = contacts.filter((contact) => contact.favorite === true);
    return res.status(200).json(getFavorite);
  }

  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");

  if (!contacts) {
    throw HttpError(404, "Not Found");
  }

  return res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const finedContact = await Contact.findById(contactId);

  if (!finedContact) {
    throw HttpError(404, "Not Found");
  }

  return res.status(200).json(finedContact);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json([newContact]);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const data = req.body;

  const result = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
  // if l wont see new object, need add { new: true }, otherwise l will see old contact
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(result);
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

  res.status(200).json([result]);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  console.log(result);

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json([{ message: "Delete success", deleted_contact: result }]);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  removeContact: ctrlWrapper(removeContact),
};
