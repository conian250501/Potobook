import express from "express";
import { feedController } from "../controllers/feedController";
export const feedRouter = express.Router();

feedRouter.get("/", feedController.feedPhotoPage);
feedRouter.get("/albums", feedController.albumPhotoPage);
