import express from "express";
import { profileController } from "../controllers/profileController";
import { authMiddleware } from "../../middleware/authMiddleware";
import { upload } from "../../middleware/upload";
import { routerHelper, schemas } from "../../helper/routerHelper";

export const profileRouter = express.Router();
profileRouter.get(
  "/",
  authMiddleware.ensureUserIsAuthenticated,
  profileController.profilePage
);
profileRouter.get(
  "/edit-profile",
  authMiddleware.ensureUserIsAuthenticated,
  profileController.editProfilePage
);
profileRouter.post(
  "/edit-profile",
  authMiddleware.ensureUserIsAuthenticated,
  upload.single("image"),
  routerHelper.validateBody(schemas.editProfile),
  profileController.editProfile
);
profileRouter.post(
  "/edit-password",
  authMiddleware.ensureUserIsAuthenticated,
  routerHelper.validateBody(schemas.editPassword),
  profileController.editPassword
);
