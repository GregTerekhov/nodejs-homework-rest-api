const express = require("express");

const { checkAuthUser, ctrlWrapper } = require("../../middlewars");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", checkAuthUser, ctrlWrapper(ctrl.getCurrent));
router.patch("/", checkAuthUser, ctrlWrapper(ctrl.updateSubscription));

module.exports = router;
