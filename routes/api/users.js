const express = require("express");

const { checkAuthUser, ctrlWrapper, upload } = require("../../middlewars");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", checkAuthUser, ctrlWrapper(ctrl.getCurrent));
router.patch("/", checkAuthUser, ctrlWrapper(ctrl.updateSubscription));
router.patch(
  "/avatars",
  checkAuthUser,
  upload.single("avatar"),
  ctrlWrapper(ctrl.avatarUploading)
);
module.exports = router;
