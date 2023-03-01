const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const phoneRegex =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
      match: phoneRegex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const postContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.string().pattern(phoneRegex).min(3).max(30).required(),
  email: Joi.string()
    .email({ tlds: { deny: ["ru"] } })
    .required(),
  favorite: Joi.boolean(),
});

const updFavoriteSchema = Joi.object({
  favorite: Joi.bool()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});

const contactSchemas = { postContactSchema, updFavoriteSchema };

const Contact = model("contact", contactSchema);

module.exports = { contactSchemas, Contact };
