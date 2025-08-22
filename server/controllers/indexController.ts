import { Request, Response } from "express";
import { getTopK } from "../db/queries";

export async function indexGetAll(req: Request, res: Response) {
    const top20 = await getTopK(50);
    res.json(top20);
}