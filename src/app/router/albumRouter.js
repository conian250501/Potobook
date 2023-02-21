import express from "express";
import { albumController } from "../controllers/albumController";
export const albumRouter = express.Router();

albumRouter.get("/", albumController.albumPage);
albumRouter.get("/new-album", albumController.newAlbumPage);
albumRouter.post("/new-album", albumController.newAlbum);
albumRouter.get("/edit-album/:id", albumController.editAlbumPage);
albumRouter.post("/edit-album/:id", albumController.editAlbum);
albumRouter.get("/delete-album/:id", albumController.deleteAlbum);
