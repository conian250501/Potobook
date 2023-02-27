import express from "express";
import { searchController } from "../controllers/searchController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const searchRouter = express.Router();

searchRouter.get("/", searchController.search);
