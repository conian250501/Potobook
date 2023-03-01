"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  avatar: {
    type: String,
    "default": null
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    lowercase: true
  },
  password: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    "default": false
  },
  token: {
    type: String,
    "default": null
  },
  verify: {
    type: Boolean,
    "default": false
  },
  active: {
    type: Boolean,
    "default": true
  },
  albums: [{
    type: Schema.Types.ObjectId,
    ref: "Album",
    "default": []
  }],
  photos: [{
    type: Schema.Types.ObjectId,
    ref: "Photo",
    "default": []
  }]
}, {
  timestamps: true
});
var User = _mongoose["default"].model("User", userSchema);
exports.User = User;