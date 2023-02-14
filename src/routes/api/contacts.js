const express = require("express");
const {
  getContact,
  getById,
  postContact,
  deleteContact,
  putContact,
} = require("../../controllers/contactsController");

const {
  postContactValidation,
  putContactValidation,
} = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", getContact);

router.get("/:contactId", getById);

router.post("/", postContactValidation, postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", putContactValidation, putContact);

module.exports = router;
