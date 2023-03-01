"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Photo = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var Schema = _mongoose["default"].Schema;
var photoSchema = new Schema({
  title: {
    type: String,
    "default": null
  },
  description: {
    type: String,
    "default": null
  },
  mode: {
    type: String,
    "default": "public"
  },
  image: {
    type: String
  },
  albums: [{
    type: Schema.Types.ObjectId,
    ref: "Album",
    "default": []
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "Like",
    "default": []
  }]
}, {
  timestamps: true
});
var Photo = _mongoose["default"].model("Photo", photoSchema);
exports.Photo = Photo;