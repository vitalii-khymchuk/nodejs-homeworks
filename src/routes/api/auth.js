const express = require("express");
const { authCtrl } = require("../../controllers");

const { moveFromTmpToCloud } = require("../../middlewares");

const {
  validateBody,
  authenticate,
  handleFormData,
} = require("../../middlewares");
const { authSchemas } = require("../../models");

const router = express.Router();

router.post("/signup", validateBody(authSchemas.sighUpSchema), authCtrl.signup);

router.post("/signin", validateBody(authSchemas.sighInSchema), authCtrl.signin);

router.get("/current", authenticate, authCtrl.current);

router.post("/logout", authenticate, authCtrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(authSchemas.patchSubscriptionSchema),
  authCtrl.patchSubscription
);

router.patch(
  "/avatars",
  authenticate,
  handleFormData.single("avatar"),
  moveFromTmpToCloud,
  authCtrl.patchAvatar
);

module.exports = router;
