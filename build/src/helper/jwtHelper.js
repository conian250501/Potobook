"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtHelper = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var jwtHelper = {
  createToken: function createToken(userId) {
    return _jsonwebtoken["default"].sign({
      name: "".concat(process.env.JWT_OPTIONS_NAME),
      userId: userId
    }, "".concat(process.env.JWT_SECRET_KEY), {
      expiresIn: "2d"
    });
  }
};
exports.jwtHelper = jwtHelper;