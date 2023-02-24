import express from "express";
import passport from "passport";
import { routerHelper, schemas } from "../../helper/routerHelper";
import { authMiddleware } from "../../middleware/authMiddleware";
import { authController } from "../controllers/authController";

export const authRouter = express.Router();

authRouter.get("/login", authController.loginPage);
authRouter.post(
  "/login",
  routerHelper.validateBody(schemas.authLogin),
  authMiddleware.checkVerification,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);
authRouter.get("/register", authController.registerPage);
authRouter.post(
  "/register",
  routerHelper.validateBody(schemas.authRegister),
  authController.register
);
authRouter.get("/logout", authController.logout);
authRouter.get("/verify-email/:token", authController.verifyEmail);

authRouter.get("/send-email", authController.sendMailPage);
authRouter.post("/send-email", authController.sendMail);
authRouter.get("/forgot-password/:token", authController.forgotPassPage);
authRouter.post(
  "/forgot-password/:token",
  routerHelper.validateBody(schemas.forgotPassword),
  authController.forgotPassword
);
