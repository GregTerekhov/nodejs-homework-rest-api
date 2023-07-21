const express = require("express");

const { checkAuthUser, validation, ctrlWrapper } = require("../../middlewars");
const { auth: ctrl } = require("../../controllers");
const { joiAuthSchema, verifyEmailSchema } = require("../../models/user");

const router = express.Router();

router.post("/register", validation(joiAuthSchema), ctrlWrapper(ctrl.register));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validation(verifyEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.post("/login", validation(joiAuthSchema), ctrlWrapper(ctrl.login));

router.post("/logout", checkAuthUser, ctrlWrapper(ctrl.logout));

module.exports = router;
