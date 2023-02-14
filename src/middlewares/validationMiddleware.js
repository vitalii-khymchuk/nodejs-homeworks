const Joi = require("joi");
const { throwError } = require("../utils/throwError");

const postContactValidation = (req, res, next) => {
  const schema = Joi.object({
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

  const result = schema.validate(req.body);
  if (result.error) {
    const message = result.error.details[0].message;
    return throwError.BAD_REQUEST(message);
  }
  next();
};

const putContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    phone: Joi.string()
      .pattern(
        /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
      )
      .min(3)
      .max(30),
    email: Joi.string().email({ tlds: { deny: ["ru"] } }),
  }).or("name", "phone", "email");

  const result = schema.validate(req.body);
  if (result.error) {
    const message = result.error.details[0].message;
    return throwError.BAD_REQUEST(message);
  }
  next();
};

module.exports = { postContactValidation, putContactValidation };
