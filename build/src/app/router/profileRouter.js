"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profileRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _profileController = require("../controllers/profileController");
var _authMiddleware = require("../../middleware/authMiddleware");
var _upload = require("../../middleware/upload");
var _routerHelper = require("../../helper/routerHelper");
var profileRouter = _express["default"].Router();
exports.profileRouter = profileRouter;
profileRouter.get("/", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _profileController.profileController.profilePage);
profileRouter.get("/edit-profile", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _profileController.profileController.editProfilePage);
profileRouter.post("/edit-profile", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _upload.upload.single("image"), _routerHelper.routerHelper.validateBody(_routerHelper.schemas.editProfile), _profileController.profileController.editProfile);
profileRouter.post("/edit-password", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _routerHelper.routerHelper.validateBody(_routerHelper.schemas.editPassword), _profileController.profileController.editPassword);