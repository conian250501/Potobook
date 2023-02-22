import express from "express";
import { profileController } from "../controllers/profileController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const profileRouter = express();
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
  profileController.editProfile
);
