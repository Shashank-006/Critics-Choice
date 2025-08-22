import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool();

export async function getTopK(limit: number) {
    const { rows } = await pool.query(`select * from movies order by rating desc limit $1`, [limit]);
    return rows;
}