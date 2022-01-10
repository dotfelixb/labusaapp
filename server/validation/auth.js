const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    fname: Joi.string(),
    lname: Joi.string().required(),
    username: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

  return schema.validate(data);
}

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

  return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;