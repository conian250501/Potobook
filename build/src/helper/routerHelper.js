"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schemas = exports.routerHelper = void 0;
var _joi = _interopRequireDefault(require("joi"));
var schemas = {
  authRegister: _joi["default"].object({
    email: _joi["default"].string().email().required(),
    firstName: _joi["default"].string().max(25).required(),
    lastName: _joi["default"].string().max(25).required(),
    password: _joi["default"].string().max(64).required(),
    confirmPassword: _joi["default"].string().max(64).required()
  }),
  authLogin: _joi["default"].object({
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().max(64).required().messages({
      "string.base": "Password should be a type of string",
      "string.empty": "Password cannot be an empty field",
      "string.max": "Password should have a maxium length of {#limit}",
      "any.required": "Password is a required field"
    })
  }),
  editPhoto: _joi["default"].object({
    title: _joi["default"].string().max(140),
    description: _joi["default"].string().max(300),
    image: _joi["default"].string(),
    images: _joi["default"].array(),
    mode: _joi["default"].string(),
    album: _joi["default"].string().allow(""),
    modeAlbum: _joi["default"].string(),
    titleAlbum: _joi["default"].string(),
    descriptionAlbum: _joi["default"].string()
  }),
  editPhotoAdmin: _joi["default"].object({
    title: _joi["default"].string().max(140),
    description: _joi["default"].string().max(300),
    image: _joi["default"].string(),
    images: _joi["default"].array(),
    mode: _joi["default"].string(),
    album: _joi["default"].string().allow(""),
    modeAlbum: _joi["default"].string(),
    titleAlbum: _joi["default"].string(),
    descriptionAlbum: _joi["default"].string(),
    userId: _joi["default"].string()
  }),
  newPhoto: _joi["default"].object({
    title: _joi["default"].string().max(140).required(),
    description: _joi["default"].string().max(300).required(),
    image: _joi["default"].string().required(),
    images: _joi["default"].array(),
    mode: _joi["default"].string().required(),
    album: _joi["default"].string().allow(""),
    modeAlbum: _joi["default"].string(),
    titleAlbum: _joi["default"].string(),
    descriptionAlbum: _joi["default"].string()
  }),
  newAlbum: _joi["default"].object({
    title: _joi["default"].string().max(140).required(),
    description: _joi["default"].string().max(300).required(),
    image: _joi["default"].string(),
    images: _joi["default"].array().required(),
    mode: _joi["default"].string().required()
  }),
  editAlbum: _joi["default"].object({
    title: _joi["default"].string().max(255),
    description: _joi["default"].string().max(255),
    image: _joi["default"].string(),
    images: _joi["default"].array(),
    mode: _joi["default"].string()
  }),
  editAlbumAdmin: _joi["default"].object({
    title: _joi["default"].string().max(255),
    description: _joi["default"].string().max(255),
    image: _joi["default"].string(),
    images: _joi["default"].array(),
    mode: _joi["default"].string(),
    userId: _joi["default"].string()
  }),
  editProfile: _joi["default"].object({
    firstName: _joi["default"].string().max(25),
    lastName: _joi["default"].string().max(25),
    image: _joi["default"].string(),
    images: _joi["default"].array()
  }),
  editPassword: _joi["default"].object({
    currentPassword: _joi["default"].string().max(64).required(),
    newPassword: _joi["default"].string().max(64).required(),
    confirmPassword: _joi["default"].string().max(64).required()
  }),
  editUser: _joi["default"].object({
    firstName: _joi["default"].string().max(25),
    lastName: _joi["default"].string().max(25),
    image: _joi["default"].string(),
    images: _joi["default"].array(),
    active: _joi["default"].string().empty("")
  }),
  forgotPassword: _joi["default"].object({
    newPassword: _joi["default"].string().max(64).required(),
    confirmPassword: _joi["default"].string().max(64).required()
  })
};
exports.schemas = schemas;
var routerHelper = {
  validateBody: function validateBody(schema) {
    return function (req, res, next) {
      var result = schema.validate(req.body, {
        abortEarly: false
      });
      if (result.error) {
        req.flash("error_message", result.error.message);
        return res.redirect("back");
      } else {
        next();
      }
    };
  }
};
exports.routerHelper = routerHelper;