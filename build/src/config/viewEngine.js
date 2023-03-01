"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewEngine = void 0;
var _path = _interopRequireDefault(require("path"));
var viewEngine = function viewEngine(app) {
  app.set("views", _path["default"].join(__dirname, "../views"));
  app.set("view engine", "pug");
};
exports.viewEngine = viewEngine;