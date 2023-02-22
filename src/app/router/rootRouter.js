import express from "express";
import { authRouter } from "./authRouter";
import { feedRouter } from "./feedRouter";
import { photoRouter } from "./photoRouter";
import { albumRouter } from "./albumRouter";
import { profileRouter } from "./profileRouter";
import { adminRouter } from "./adminRouter";

export const rootRouter = (app) => {
  app.use("/admin", adminRouter);
  app.use("/my-profile", profileRouter);
  app.use("/my-photos", photoRouter);
  app.use("/my-albums", albumRouter);
  app.use("/auth", authRouter);
  app.use("/", feedRouter);
};
