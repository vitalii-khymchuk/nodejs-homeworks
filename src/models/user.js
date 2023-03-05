const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subsciptions = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 25,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    subscription: {
      type: String,
      enum: subsciptions,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const sighUpSchema = Joi.object({
  email: Joi.string()
    .min(3)
    .max(30)
    .email({ tlds: { deny: ["ru"] } })
    .pattern(emailRegexp)
    .required(),
  name: Joi.string().min(4).max(25).required(),
  password: Joi.string().min(6).alphanum().required(),
});

const sighInSchema = Joi.object({
  email: Joi.string()
    .min(3)
    .max(30)
    .email({ tlds: { deny: ["ru"] } })
    .pattern(emailRegexp)
    .required(),
  password: Joi.string().min(6).alphanum().required(),
});

const patchSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subsciptions)
    .required()
    .messages({ "any.required": "missing field subscription" }),
});

const authSchemas = { sighUpSchema, sighInSchema, patchSubscriptionSchema };

const User = model("user", userSchema);

module.exports = { authSchemas, User };
