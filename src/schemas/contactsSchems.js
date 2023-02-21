const Joi = require("joi");

const postContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.string()
    .pattern(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    )
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ tlds: { deny: ["ru"] } })
    .required(),
});

const putContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  phone: Joi.string()
    .pattern(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    )
    .min(3)
    .max(30),
  email: Joi.string().email({ tlds: { deny: ["ru"] } }),
}).or("name", "phone", "email");

module.exports = { postContact, putContact };
