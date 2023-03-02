const express = require("express");

const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  updateFavorite,
  removeContact,
} = require("../../controllers");

const { validateBody, validId, validateFavorite } = require("../../middlewars");

const {
  addContactSchema,
  updateFavoriteSchema,
} = require("../../models/contact");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", validId, getContactById);

router.post("/", validateBody(addContactSchema), createContact);

router.put(
  "/:contactId",
  validId,
  validateBody(addContactSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  validId,
  validateFavorite(updateFavoriteSchema),
  updateFavorite
);

router.delete("/:contactId", validId, removeContact);

module.exports = router;
