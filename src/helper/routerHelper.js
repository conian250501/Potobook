import Joi from "joi";

export const schemas = {
  authRegister: Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().max(25).required(),
    lastName: Joi.string().max(25).required(),
    password: Joi.string().max(64).required(),
    confirmPassword: Joi.string().max(64).required(),
  }),
  authLogin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(64).required().messages({
      "string.base": `Password should be a type of string`,
      "string.empty": `Password cannot be an empty field`,
      "string.max": `Password should have a maxium length of {#limit}`,
      "any.required": `Password is a required field`,
    }),
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
  editPhotoAdmin: Joi.object({
    title: Joi.string().max(140),
    description: Joi.string().max(300),
    image: Joi.string(),
    images: Joi.array(),
    mode: Joi.string(),
    album: Joi.string().allow(""),
    modeAlbum: Joi.string(),
    titleAlbum: Joi.string(),
    descriptionAlbum: Joi.string(),
    userId: Joi.string(),
  }),
  newPhoto: Joi.object({
    title: Joi.string().max(140).required(),
    description: Joi.string().max(300).required(),
    image: Joi.string().required(),
    images: Joi.array(),
    mode: Joi.string().required(),
    album: Joi.string().allow(""),
    modeAlbum: Joi.string(),
    titleAlbum: Joi.string(),
    descriptionAlbum: Joi.string(),
  }),
  newAlbum: Joi.object({
    title: Joi.string().max(140).required(),
    description: Joi.string().max(300).required(),
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
  editAlbumAdmin: Joi.object({
    title: Joi.string().max(255),
    description: Joi.string().max(255),
    image: Joi.string(),
    images: Joi.array(),
    mode: Joi.string(),
    userId: Joi.string(),
  }),
  editProfile: Joi.object({
    firstName: Joi.string().max(25),
    lastName: Joi.string().max(25),
    image: Joi.string(),
    images: Joi.array(),
  }),
  editPassword: Joi.object({
    currentPassword: Joi.string().max(64).required(),
    newPassword: Joi.string().max(64).required(),
    confirmPassword: Joi.string().max(64).required(),
  }),
  editUser: Joi.object({
    firstName: Joi.string().max(25),
    lastName: Joi.string().max(25),
    image: Joi.string(),
    images: Joi.array(),
    active: Joi.string().empty(""),
  }),
  forgotPassword: Joi.object({
    newPassword: Joi.string().max(64).required(),
    confirmPassword: Joi.string().max(64).required(),
  }),
};

export const routerHelper = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body, { abortEarly: false });
      if (result.error) {
        req.flash("error_message", result.error.message);
        return res.redirect("back");
      } else {
        next();
      }
    };
  },
};
