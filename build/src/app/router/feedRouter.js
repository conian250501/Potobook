"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.feedRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _feedController = require("../controllers/feedController");
var feedRouter = _express["default"].Router();
exports.feedRouter = feedRouter;
feedRouter.get("/", _feedController.feedController.feedPhotoPage);
feedRouter.get("/albums", _feedController.feedController.albumPhotoPage);