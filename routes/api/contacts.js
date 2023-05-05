const express = require("express");

const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  updateFavorite,
  removeContact,
} = require("../../controllers");

const {
  validateBody,
  isValidId,
  validateFavorite,
  authenticate,
} = require("../../middlewars");

console.log(authenticate);

const {
  addContactSchema,
  updateFavoriteSchema,
  updateContactSchema,
} = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, getAllContacts);

router.get("/:contactId", authenticate, isValidId, getContactById);

router.post(
  "/create",
  authenticate,
  validateBody(addContactSchema),
  createContact
);

router.put(
  "/update/:contactId",
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  updateContact
);

router.patch(
  "/favorite/:contactId",
  authenticate,
  isValidId,
  validateFavorite(updateFavoriteSchema),
  updateFavorite
);

router.delete("/delete/:contactId", authenticate, isValidId, removeContact);

module.exports = router;
