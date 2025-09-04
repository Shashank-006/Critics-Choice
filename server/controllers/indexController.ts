import { Request, Response } from "express";
import { getTopK } from "../db/queries";

export async function indexGetAll(req: Request, res: Response) {
    const maxRuntime = Number(req.query.maxRuntime);
    if(Number.isNaN(maxRuntime)) throw new Error("Wrong query params!");
    const topK = await getTopK(maxRuntime * 60, 50);
    res.json(topK);
}