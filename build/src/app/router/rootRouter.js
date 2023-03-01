"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _authRouter = require("./authRouter");
var _feedRouter = require("./feedRouter");
var _photoRouter = require("./photoRouter");
var _albumRouter = require("./albumRouter");
var _profileRouter = require("./profileRouter");
var _adminRouter = require("./adminRouter");
var _searchRouter = require("./searchRouter");
var rootRouter = function rootRouter(app) {
  app.use("/search", _searchRouter.searchRouter);
  app.use("/admin", _adminRouter.adminRouter);
  app.use("/my-profile", _profileRouter.profileRouter);
  app.use("/my-photos", _photoRouter.photoRouter);
  app.use("/my-albums", _albumRouter.albumRouter);
  app.use("/auth", _authRouter.authRouter);
  app.use("/", _feedRouter.feedRouter);
};
exports.rootRouter = rootRouter;