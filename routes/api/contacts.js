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
  validId,
  validateFavorite,
  authenticate,
} = require("../../middlewars");

console.log(authenticate);

const {
  addContactSchema,
  updateFavoriteSchema,
} = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, getAllContacts);

router.get("/:contactId", authenticate, validId, getContactById);

router.post("/", authenticate, validateBody(addContactSchema), createContact);

router.put(
  "/:contactId",
  authenticate,
  validId,
  validateBody(addContactSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validId,
  validateFavorite(updateFavoriteSchema),
  updateFavorite
);

router.delete("/:contactId", authenticate, validId, removeContact);

module.exports = router;
