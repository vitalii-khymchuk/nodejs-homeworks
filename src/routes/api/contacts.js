const express = require("express");
const { contactsCtrl } = require("../../controllers");

const { contactsBodyValidation, isValidId } = require("../../middlewares");
const { contactSchemas } = require("../../models");

const router = express.Router();

router.get("/", contactsCtrl.get);

router.get("/:contactId", isValidId, contactsCtrl.getById);

router.post(
  "/",
  isValidId,
  contactsBodyValidation(contactSchemas.postContact),
  contactsCtrl.post
);

router.delete("/:contactId", isValidId, contactsCtrl.remove);

router.put(
  "/:contactId",
  isValidId,
  contactsBodyValidation(contactSchemas.postContact),
  contactsCtrl.put
);

module.exports = router;
