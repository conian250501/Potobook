import Joi from "joi";

export const schemas = {
  authRegister: Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().max(25).required(),
    lastName: Joi.string().max(25).required(),
    password: Joi.string().max(64).required(),
    confirmPassword: Joi.ref("password"),
  }),
  authLogin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  editPhoto: Joi.object({
    title: Joi.string().max(140),
    description: Joi.string().max(300),
    image: Joi.string(),
    images: Joi.array(),
    mode: Joi.string(),
    album: Joi.string().allow(""),
    modeAlbum: Joi.string(),
    titleAlbum: Joi.string(),
    descriptionAlbum: Joi.string(),
  }),
  newPhoto: Joi.object({
    title: Joi.string().max(255).required(),
    description: Joi.string().max(255).required(),
    image: Joi.string().required(),
    images: Joi.array(),
    mode: Joi.string().required(),
    album: Joi.string().allow(""),
    modeAlbum: Joi.string(),
    titleAlbum: Joi.string(),
    descriptionAlbum: Joi.string(),
  }),
  newAlbum: Joi.object({
    title: Joi.string().max(255).required(),
    description: Joi.string().max(255).required(),
    image: Joi.string(),
    images: Joi.array().required(),
    mode: Joi.string().required(),
  }),
  editAlbum: Joi.object({
    title: Joi.string().max(255),
    description: Joi.string().max(255),
    image: Joi.string(),
    images: Joi.array(),
    mode: Joi.string(),
  }),
};

export const routerHelper = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        req.flash("error_message", result.error.message);
        return res.redirect("back");
      } else {
        next();
      }
    };
  },
};
