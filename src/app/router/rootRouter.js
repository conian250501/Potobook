import express from "express";
import { authRouter } from "./authRouter";
import { feedRouter } from "./feedRouter";
import { photoRouter } from "./photoRouter";
import { albumRouter } from "./albumRouter";

export const rootRouter = (app) => {
  app.use("/my-photos", photoRouter);
  app.use("/my-albums", albumRouter);
  app.use("/auth", authRouter);
  app.use("/", feedRouter);
};
