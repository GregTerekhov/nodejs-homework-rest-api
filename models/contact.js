const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaValidationErrors } = require("../helpers");

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const phoneRegexp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: [emailRegexp, "Invalid email address"],
    },
    phone: {
      type: String,
      unique: [true, "Phone must be unique"],
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().pattern(emailRegexp).lowercase().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.bool(),
});

const statusJoiSchema = Joi.object({
  favorite: Joi.bool().messages({ message: "Missing field favorite" }),
});

contactSchema.post("save", handleSchemaValidationErrors);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  statusJoiSchema,
};
