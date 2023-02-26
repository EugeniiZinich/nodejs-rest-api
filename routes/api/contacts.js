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
  contactSchema,
  updateFavoriteSchema,
} = require("../../schems/contacts");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", validId, getContactById);

router.post("/", validateBody(contactSchema), createContact);

router.put("/:contactId", validId, validateBody(contactSchema), updateContact);

router.patch(
  "/:contactId/favorite",
  validId,
  validateFavorite(updateFavoriteSchema),
  updateFavorite
);

router.delete("/:contactId", validId, removeContact);

module.exports = router;
