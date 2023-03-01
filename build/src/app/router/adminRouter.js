"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _authMiddleware = require("../../middleware/authMiddleware");
var _adminController = require("../controllers/adminController");
var _upload = require("../../middleware/upload");
var _routerHelper = require("../../helper/routerHelper");
var adminRouter = _express["default"].Router();

// PHOTO ROUTER
exports.adminRouter = adminRouter;
adminRouter.get("/", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _adminController.adminController.photosPage);
adminRouter.get("/edit-photo/:id", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _adminController.adminController.editPhotoPage);
adminRouter.post("/edit-photo/:id", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _upload.upload.single("image"), _routerHelper.routerHelper.validateBody(_routerHelper.schemas.editPhotoAdmin), _adminController.adminController.editPhoto);
adminRouter.get("/delete-photo/:id", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _adminController.adminController.deletePhoto);

// ALBUMS ROUTER
adminRouter.get("/albums", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _adminController.adminController.albumsPage);
adminRouter.get("/edit-album/:id", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _adminController.adminController.editAlbumPage);
adminRouter.post("/edit-album/:id", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _upload.upload.array("images", 12), _routerHelper.routerHelper.validateBody(_routerHelper.schemas.editAlbumAdmin), _adminController.adminController.editAlbum);
adminRouter.get("/delete-album/:id", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _adminController.adminController.deleteAlbum);
adminRouter.get("/:id/delete-PhotoOfAlbum/:idPhoto", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _adminController.adminController.deletePhotoOfAlbum);

// USER ROUTER
adminRouter.get("/users", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _adminController.adminController.usersPage);
adminRouter.get("/edit-user/:id", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _adminController.adminController.editUserPage);
adminRouter.post("/edit-user/:id", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _upload.upload.single("image"), _routerHelper.routerHelper.validateBody(_routerHelper.schemas.editUser), _adminController.adminController.editUser);
adminRouter.get("/delete-user/:id", _authMiddleware.authMiddleware.ensureUserIsAuthenticated, _adminController.adminController.deleteUser);