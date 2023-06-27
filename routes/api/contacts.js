const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewars");
const { contactsSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(contactsSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getList));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.add));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateById));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

module.exports = router;
