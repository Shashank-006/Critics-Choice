import { Client } from "pg";
import { fetch100 } from "../APIs/fetchInfo";
import dotenv from "dotenv";
dotenv.config();

interface Movie {
    title: string
    poster: string
    title_type: string
    rating: string
    img: string
    [key: string]: any
}

export async function dropDB() {
    const client = new Client();
    await client.connect();

    await client.query("drop table if exists movies;");

    await client.end();
}

async function initializeDB() {
    const createQuery = `
        create table if not exists movies (
            id integer primary key generated always as identity,
            title varchar(1000),
            img varchar(1000),
            rating real  
        );`

    const client = new Client();
    await client.connect();

    await client.query(createQuery);

    await client.end();
}

export async function populateDB() {

    const client = new Client();
    await client.connect();

    await initializeDB();

    let offset = 0;
    let lastUserUpdate = 0;
    while(true) {
        const vals = await fetch100(offset, "movie");
        const results: Movie[] = vals.results;

        if(results.length === 0)
            break;

        offset += results.length;

        if(offset >= 5000 + lastUserUpdate) {
            console.log(`Seeded ${offset} so far!`);
            lastUserUpdate = offset;
        }

        const allVals = results.reduce((acc: (string | number)[], movie) => {
            acc.push(movie.title);
            acc.push(movie.img);
            acc.push(Number(movie.rating));
            return acc;
        }, []);


        const placeholders = results
            .map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`)
            .join(", ");
        const insertQuery = `insert into movies (title, img, rating) values ${placeholders}`;
        await client.query(insertQuery, allVals);
    }

    await client.end();

    console.log(`DB populated: ${offset} movies added!`);
}

async function dropAndPopulate() {
    await dropDB();
    await initializeDB();
    await populateDB();
}

dropAndPopulate();