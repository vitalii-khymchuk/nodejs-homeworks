const { Schema, model, SchemaTypes } = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const phoneRegex =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
      match: emailRegexp,
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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const postContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().pattern(phoneRegex).min(3).max(20).required(),
  email: Joi.string()
    .min(3)
    .max(30)
    .email({ tlds: { deny: ["ru"] } })
    .pattern(emailRegexp)
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
