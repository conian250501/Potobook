import express from "express";
import { photoController } from "../controllers/photoController";
export const photoRouter = express.Router();

photoRouter.get("/", photoController.photoPage);
photoRouter.get("/new-photo", photoController.newPhotoPage);
photoRouter.post("/new-photo", photoController.newPhoto);
photoRouter.get("/edit-photo/:id", photoController.editPhotoPage);
photoRouter.post("/edit-photo/:id", photoController.editPhoto);
photoRouter.get("/delete-photo/:id", photoController.deletePhoto);
