import express from "express";
import { authRouter } from "./authRouter";
import { feedRouter } from "./feedRouter";

export const rootRouter = (app) => {
  app.use("/auth", authRouter);
  app.use("/", feedRouter);
};
