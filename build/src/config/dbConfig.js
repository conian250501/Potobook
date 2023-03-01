"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectMongoDB = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
_mongoose["default"].set("strictQuery", false);
console.log(process.env.MONGODB_PASSWORD);
var connectMongoDB = _mongoose["default"].connect("mongodb+srv://taitm:minhtai3214@potobooknus.rtrrvro.mongodb.net/potobook");
exports.connectMongoDB = connectMongoDB;