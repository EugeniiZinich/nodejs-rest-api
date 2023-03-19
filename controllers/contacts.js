const { Contact } = require("../models/contact");

const { ctrlWrapper, HttpError } = require("../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;

  if (favorite === "true") {
    const contacts = await Contact.find({ owner }, "-createdAt -updatedAt");

    const getFavorite = contacts.filter((contact) => contact.favorite === true);
    return res.json(getFavorite);
  }

  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");

  if (!contacts) {
    throw HttpError(404, "Not Found");
  }

  return res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const finedContact = await Contact.findById(contactId);

  if (!finedContact) {
    throw HttpError(404, "Not Found");
  }

  return res.json(finedContact);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  console.log(req.body);
  const newContact = await Contact.create({ ...req.body, owner });
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
