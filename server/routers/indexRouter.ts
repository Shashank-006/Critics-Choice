import express from "express";
import { indexGetAll } from "../controllers/indexController";

const router = express.Router();

router.get("/", indexGetAll);

export default router;