"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.albumRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _albumController = require("../controllers/albumController");
var _authMiddleware = require("../../middleware/authMiddleware");
var _routerHelper = require("../../helper/routerHelper");
var _upload = require("../../middleware/upload");
var albumRouter = _express["default"].Router();
exports.albumRouter = albumRouter;
albumRouter.get("/", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _albumController.albumController.albumPage);
albumRouter.get("/new-album", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _albumController.albumController.newAlbumPage);
albumRouter.post("/new-album", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _upload.upload.array("images", 12), _routerHelper.routerHelper.validateBody(_routerHelper.schemas.newAlbum), _albumController.albumController.newAlbum);
albumRouter.get("/edit-album/:id", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _albumController.albumController.editAlbumPage);
albumRouter.post("/edit-album/:id", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _upload.upload.array("images", 12), _routerHelper.routerHelper.validateBody(_routerHelper.schemas.editAlbum), _albumController.albumController.editAlbum);
albumRouter.get("/delete-album/:id", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _albumController.albumController.deleteAlbum);
albumRouter.get("/:id/delete-photo/:idPhoto", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _albumController.albumController.deletePhotoOfAlbum);
albumRouter.post("/:id/like/", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _albumController.albumController.likeAlbum);
albumRouter.post("/:id/unlike/", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _albumController.albumController.dislikeAlbum);