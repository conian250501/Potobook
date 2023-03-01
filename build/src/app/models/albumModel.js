"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Album = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var Schema = _mongoose["default"].Schema;
var albumSchema = new Schema({
  title: {
    type: String,
    "default": null
  },
  description: {
    type: String,
    "default": null
  },
  mode: {
    type: String
  },
  photos: [{
    type: Schema.Types.ObjectId,
    ref: "Photo",
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
var Album = _mongoose["default"].model("Album", albumSchema);
exports.Album = Album;