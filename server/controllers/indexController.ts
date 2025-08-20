import { Request, Response } from "express";

const posts = {rating: 10, name: "shawshank redemption"};

export function indexGetAll(req: Request, res: Response) {
    console.log("Received indexGetAll request");
    res.json(posts);
}