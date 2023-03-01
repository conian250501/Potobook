"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.photoRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _photoController = require("../controllers/photoController");
var _authMiddleware = require("../../middleware/authMiddleware");
var _upload = require("../../middleware/upload");
var _routerHelper = require("../../helper/routerHelper");
var photoRouter = _express["default"].Router();
exports.photoRouter = photoRouter;
photoRouter.get("/", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _photoController.photoController.photoPage);
photoRouter.get("/new-photo", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _photoController.photoController.newPhotoPage);
photoRouter.post("/new-photo", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _upload.upload.single("image"), _routerHelper.routerHelper.validateBody(_routerHelper.schemas.newPhoto), _photoController.photoController.newPhoto);
photoRouter.get("/edit-photo/:id", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _photoController.photoController.editPhotoPage);
photoRouter.post("/edit-photo/:id", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _upload.upload.single("image"), _routerHelper.routerHelper.validateBody(_routerHelper.schemas.editPhoto), _photoController.photoController.editPhoto);
photoRouter.get("/delete-photo/:id", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _photoController.photoController.deletePhoto);
photoRouter.post("/:id/like", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _photoController.photoController.likePhoto);
photoRouter.post("/:id/unlike", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _photoController.photoController.dislikePhoto);