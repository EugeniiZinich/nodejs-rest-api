const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const listResult = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(listResult);
};

const getContactId = async (contactId) => {
  const listResult = await fs.readFile(contactsPath, "utf-8");

  const parseContact = JSON.parse(listResult);

  const foundContact = parseContact.find((contact) => contact.id === contactId);

  return foundContact || null;
};

const addContact = async (body) => {
  const oldContacts = await listContacts();

  const newData = {
    id: uuidv4(),
    ...body,
  };

  oldContacts.push(newData);

  await fs.writeFile(contactsPath, JSON.stringify(oldContacts), (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
    }
  });

  // const newContact = await listContacts();

  return newData;
};

const updateById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

const deleteContact = async (contactId) => {
  const oldContacts = await listContacts();

  const findContactDyId = oldContacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (findContactDyId === -1) return null;

  const deletedContact = oldContacts.splice(findContactDyId, 1);

  await fs.writeFile(contactsPath, JSON.stringify(oldContacts), (err) => {
    if (err) console.log(err);
    else {
      console.log(`Contact ${deletedContact}  was deleted`);
    }
  });

  const newContact = await listContacts();

  return { newContact, deletedContact };
};

module.exports = {
  listContacts,
  getContactId,
  deleteContact,
  addContact,
  updateById,
};
