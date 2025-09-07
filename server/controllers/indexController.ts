import { Request, Response } from "express";
import { getTopK } from "../db/queries";
import type { Genres } from "../types/filters";
const genreList = ["Drama", "Romance", "Comedy", "Sport", "Fantasy", "Mystery", "Action", "Thriller", "Horror", "Sci-Fi", "Crime", "Adventure"];

export async function indexGetAll(req: Request, res: Response) {
    const maxRuntime = Number(req.query.maxRuntime);

    if(Number.isNaN(maxRuntime)) throw new Error("Wrong query params!");
    const genres = genreList.reduce((acc: Genres, genre) => {
        acc[genre] = req.query[genre] === "true";
        return acc;
    }, {});

    const topK = await getTopK(maxRuntime * 60, genres, 50);
    res.json(topK);
}