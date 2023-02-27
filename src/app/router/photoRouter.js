import express from "express";
import { photoController } from "../controllers/photoController";
import { authMiddleware } from "../../middleware/authMiddleware";
import { upload } from "../../middleware/upload";
import { routerHelper, schemas } from "../../helper/routerHelper";
export const photoRouter = express.Router();

photoRouter.get(
  "/",
  authMiddleware.ensureUserIsAuthenticated,
  photoController.photoPage
);
photoRouter.get(
  "/new-photo",
  authMiddleware.ensureUserIsAuthenticated,
  photoController.newPhotoPage
);
photoRouter.post(
  "/new-photo",
  authMiddleware.ensureUserIsAuthenticated,
  upload.single("image"),
  routerHelper.validateBody(schemas.newPhoto),
  photoController.newPhoto
);
photoRouter.get(
  "/edit-photo/:id",
  authMiddleware.ensureUserIsAuthenticated,

  photoController.editPhotoPage
);
photoRouter.post(
  "/edit-photo/:id",
  authMiddleware.ensureUserIsAuthenticated,
  upload.single("image"),
  routerHelper.validateBody(schemas.editPhoto),
  photoController.editPhoto
);
photoRouter.get(
  "/delete-photo/:id",
  authMiddleware.ensureUserIsAuthenticated,
  photoController.deletePhoto
);

photoRouter.post(
  "/:id/like",
  authMiddleware.ensureUserIsAuthenticated,

  photoController.likePhoto
);
photoRouter.post(
  "/:id/unlike",
  authMiddleware.ensureUserIsAuthenticated,

  photoController.dislikePhoto
);
