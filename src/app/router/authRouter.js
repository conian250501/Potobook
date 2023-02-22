import express from "express";
import passport from "passport";
import { routerHelper, schemas } from "../../helper/routerHelper";
import { authController } from "../controllers/authController";

export const authRouter = express.Router();

authRouter.get("/login", authController.loginPage);
authRouter.post(
  "/login",
  routerHelper.validateBody(schemas.authLogin),
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
