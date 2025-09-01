import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool();

export async function getTopK(limit: number) {
    const { rows } = await pool.query(`select * from movies where imdbrating is not null order by imdbrating desc limit $1`, [limit]);
    return rows;
}