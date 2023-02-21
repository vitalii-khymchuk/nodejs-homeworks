const express = require("express");
const { contactsCtrl } = require("../../controllers");

const { contactsBodyValidation } = require("../../middlewares");
const { contactSchemas } = require("../../schemas");

const router = express.Router();

router.get("/", contactsCtrl.get);

router.get("/:contactId", contactsCtrl.getById);

router.post(
  "/",
  contactsBodyValidation(contactSchemas.postContact),
  contactsCtrl.post
);

router.delete("/:contactId", contactsCtrl.remove);

router.put(
  "/:contactId",
  contactsBodyValidation(contactSchemas.putContact),
  contactsCtrl.put
);

module.exports = router;
