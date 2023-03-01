"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Like = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var Schema = _mongoose["default"].Schema;
var likeSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  nameAuthor: {
    type: String
  },
  likeType: {
    type: String,
    "enum": ["PHOTO", "ALBUM", "COMMENT"]
  },
  likeTypeId: {
    type: Schema.Types.ObjectId
  }
});
var Like = _mongoose["default"].model("Like", likeSchema);
exports.Like = Like;