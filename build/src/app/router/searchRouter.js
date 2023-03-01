"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _searchController = require("../controllers/searchController");
var _authMiddleware = require("../../middleware/authMiddleware");
var searchRouter = _express["default"].Router();
exports.searchRouter = searchRouter;
searchRouter.get("/", _searchController.searchController.search);