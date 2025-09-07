import { Pool } from "pg";
import dotenv from "dotenv";
import type { Genres } from "../types/filters";
dotenv.config();

const pool = new Pool();

export async function getTopK(maxRuntime: number, genres: Genres, limit: number) {
    const vals = [];
    vals.push(maxRuntime);
    const includedGenres = Object.keys(genres).filter(genre => genres[genre]);
    console.log(includedGenres);
    const genreStatements = includedGenres.map(genre => {
        vals.push(genre);
        return `genre like '%' || $${vals.length} || '%'`
    });
    const genreClause = ` and (${genreStatements.join(" or ")})`;
    vals.push(limit);
    const fullQuery = `select * from movies where imdbrating is not null and runtime <= $1${includedGenres.length > 0 ? genreClause : ""} order by imdbrating desc, title limit $${vals.length}`;
    const { rows } = await pool.query(fullQuery, vals);
    return rows;
}