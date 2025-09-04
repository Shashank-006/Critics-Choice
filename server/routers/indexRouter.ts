import express from "express";
import { indexGetAll } from "../controllers/indexController";

const router = express.Router();

router.get("/getMovies", indexGetAll);

export default router;