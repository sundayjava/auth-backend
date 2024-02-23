const Joi = require("joi");

const signUpschema = Joi.object().keys({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  phonenumber: Joi.string().required(),
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string().required(),
});

const options = { 
  abortEarly: false,
  errors: {
    wrap: {
      label: "All fields are required",
    },
  },
};

module.exports = {
  signUpschema,
  options,
};
