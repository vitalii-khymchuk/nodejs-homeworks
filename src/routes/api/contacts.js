const express = require("express");
const { contactsCtrl } = require("../../controllers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { contactSchemas } = require("../../models");

const router = express.Router();

router.get("/", authenticate, contactsCtrl.get);

router.get("/:contactId", authenticate, isValidId, contactsCtrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(contactSchemas.postContactSchema),
  contactsCtrl.post
);

router.delete("/:contactId", authenticate, isValidId, contactsCtrl.remove);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(contactSchemas.postContactSchema),
  contactsCtrl.put
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(contactSchemas.updFavoriteSchema),
  contactsCtrl.patchFav
);

module.exports = router;
