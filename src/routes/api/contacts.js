const express = require("express");
const { contactsCtrl } = require("../../controllers");

const { contactsBodyValidation, isValidId } = require("../../middlewares");
const { contactSchemas } = require("../../models");

const router = express.Router();

router.get("/", contactsCtrl.get);

router.get("/:contactId", isValidId, contactsCtrl.getById);

router.post(
  "/",
  contactsBodyValidation(contactSchemas.postContactSchema),
  contactsCtrl.post
);

router.delete("/:contactId", isValidId, contactsCtrl.remove);

router.put(
  "/:contactId",
  isValidId,
  contactsBodyValidation(contactSchemas.postContactSchema),
  contactsCtrl.put
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  contactsBodyValidation(contactSchemas.updFavoriteSchema),
  contactsCtrl.patchFav
);

module.exports = router;
