import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { adminController } from "../controllers/adminController";
import { upload } from "../../middleware/upload";
import { routerHelper, schemas } from "../../helper/routerHelper";

export const adminRouter = express.Router();

// PHOTO ROUTER
adminRouter.get(
  "/",
  authMiddleware.ensureUserIsAuthenticated,
  adminController.photosPage
);
adminRouter.get(
  "/edit-photo/:id",
  authMiddleware.ensureUserIsAuthenticated,
  adminController.editPhotoPage
);
adminRouter.post(
  "/edit-photo/:id",
  authMiddleware.ensureUserIsAuthenticated,
  upload.single("image"),
  routerHelper.validateBody(schemas.editPhotoAdmin),
  adminController.editPhoto
);
adminRouter.get(
  "/delete-photo/:id",
  authMiddleware.ensureUserIsAuthenticated,
  adminController.deletePhoto
);

// ALBUMS ROUTER
adminRouter.get(
  "/albums",
  authMiddleware.ensureUserIsAuthenticated,
  adminController.albumsPage
);
adminRouter.get(
  "/edit-album/:id",
  authMiddleware.ensureUserIsAuthenticated,
  adminController.editAlbumPage
);
adminRouter.post(
  "/edit-album/:id",
  authMiddleware.ensureUserIsAuthenticated,
  upload.array("images", 12),
  routerHelper.validateBody(schemas.editAlbumAdmin),
  adminController.editAlbum
);
adminRouter.get(
  "/delete-album/:id",
  authMiddleware.ensureUserIsAuthenticated,
  adminController.deleteAlbum
);
adminRouter.get(
  "/:id/delete-PhotoOfAlbum/:idPhoto",
  authMiddleware.ensureUserIsAuthenticated,
  adminController.deletePhotoOfAlbum
);

// USER ROUTER
adminRouter.get(
  "/users",
  authMiddleware.ensureUserIsAuthenticated,
  adminController.usersPage
);
adminRouter.get(
  "/edit-user/:id",
  authMiddleware.ensureUserIsAuthenticated,
  adminController.editUserPage
);
adminRouter.post(
  "/edit-user/:id",
  authMiddleware.ensureUserIsAuthenticated,
  upload.single("image"),
  routerHelper.validateBody(schemas.editUser),
  adminController.editUser
);
adminRouter.get(
  "/delete-user/:id",
  authMiddleware.ensureUserIsAuthenticated,
  adminController.deleteUser
);
