import express from "express";
import { albumController } from "../controllers/albumController";
import { authMiddleware } from "../../middleware/authMiddleware";
import { routerHelper, schemas } from "../../helper/routerHelper";
import { upload } from "../../middleware/upload";
export const albumRouter = express.Router();

albumRouter.get(
  "/",
  authMiddleware.ensureUserIsAuthenticated,
  albumController.albumPage
);
albumRouter.get(
  "/new-album",
  authMiddleware.ensureUserIsAuthenticated,
  albumController.newAlbumPage
);
albumRouter.post(
  "/new-album",
  authMiddleware.ensureUserIsAuthenticated,
  upload.array("images", 12),
  routerHelper.validateBody(schemas.newAlbum),
  albumController.newAlbum
);
albumRouter.get(
  "/edit-album/:id",
  authMiddleware.ensureUserIsAuthenticated,
  albumController.editAlbumPage
);
albumRouter.post(
  "/edit-album/:id",
  authMiddleware.ensureUserIsAuthenticated,
  upload.array("images", 12),
  routerHelper.validateBody(schemas.editAlbum),
  albumController.editAlbum
);
albumRouter.get(
  "/delete-album/:id",
  authMiddleware.ensureUserIsAuthenticated,
  albumController.deleteAlbum
);
albumRouter.get(
  "/:id/delete-photo/:idPhoto",
  authMiddleware.ensureUserIsAuthenticated,
  albumController.deletePhotoOfAlbum
);
