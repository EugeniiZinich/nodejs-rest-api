const express = require("express");
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
} = require("../../controllers");

const { validateBody } = require("../../middlewars");

const { contactSchema } = require("../../schems/contacts");

console.log(contactSchema.error);

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", validateBody(contactSchema), createContact);

router.put("/:contactId", validateBody(contactSchema), updateContact);

router.delete("/:contactId", removeContact);

module.exports = router;
