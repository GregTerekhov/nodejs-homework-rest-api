const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewars");
const { joiSchema, statusJoiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(joiSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getList));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.add));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  validation(statusJoiSchema),
  ctrlWrapper(ctrl.updateStatus)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

module.exports = router;
