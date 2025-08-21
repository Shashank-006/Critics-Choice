import { Request, Response } from "express";
import { RequestOptions } from "https";
import { dropDB, populateDB } from "../db/populateDB";


export function indexGetAll(req: Request, res: Response) {
    console.log("Received indexGetAll request");
}