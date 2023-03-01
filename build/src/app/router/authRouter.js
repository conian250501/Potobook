"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _routerHelper = require("../../helper/routerHelper");
var _authMiddleware = require("../../middleware/authMiddleware");
var _authController = require("../controllers/authController");
var authRouter = _express["default"].Router();
exports.authRouter = authRouter;
authRouter.get("/login", _authController.authController.loginPage);
authRouter.post("/login", _routerHelper.routerHelper.validateBody(_routerHelper.schemas.authLogin), _authMiddleware.authMiddleware.checkVerification, _passport["default"].authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true
}));
authRouter.get("/register", _authController.authController.registerPage);
authRouter.post("/register", _routerHelper.routerHelper.validateBody(_routerHelper.schemas.authRegister), _authController.authController.register);
authRouter.get("/logout", _authController.authController.logout);
authRouter.get("/verify-email/:token", _authController.authController.verifyEmail);
authRouter.get("/send-email", _authController.authController.sendMailPage);
authRouter.post("/send-email", _authController.authController.sendMail);
authRouter.get("/forgot-password/:token", _authController.authController.forgotPassPage);
authRouter.post("/forgot-password/:token", _routerHelper.routerHelper.validateBody(_routerHelper.schemas.forgotPassword), _authController.authController.forgotPassword);