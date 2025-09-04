import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool();

export async function getTopK(maxRuntime: number , limit: number) {
    const { rows } = await pool.query(`select * from movies where imdbrating is not null and runtime <= $1 order by imdbrating desc limit $2`, [maxRuntime, limit]);
    return rows;
}