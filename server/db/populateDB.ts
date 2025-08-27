import { Client } from "pg";
import { fetch250WatchMode, fetchOMDB } from "../APIs/fetchInfo";
import dotenv from "dotenv";
dotenv.config();

interface Movie {
    title: string
    type: string
    imdb_id: string
    tmdb_id: string
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
            imdb_id varchar(10),
            tmdb_id varchar(10),
            imdbRating real,
            imdbVotes integer,
            metascore integer,
            runtime integer,
            plot varchar(1000),
            awards varchar(1000),
            genre varchar(100),
            year integer
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

    let page = 1;

    let totalResults: number;
    while(true) {
        const vals = await fetch250WatchMode(page, "movie");
        const results: Movie[] = vals.titles;
        totalResults = vals.total_results;
        page++;

        if(results.length === 0)
            break;

        const allVals = results.reduce((acc: string[], movie) => {
            acc.push(movie.title);
            acc.push(movie.imdb_id);
            acc.push(movie.tmdb_id);
            return acc;
        }, []);


        const placeholders = results
            .map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`)
            .join(", ");
        const insertQuery = `insert into movies (title, imdb_id, tmdb_id) values ${placeholders}`;
        await client.query(insertQuery, allVals);
    }

    await client.end();

    console.log(`DB populated: ${totalResults} movies added!`);
}

async function populateOMDB(start: number, end: number) {
    function updateValue(imdb_id: string, value: any, label: string) {
        if(value !== "N/A"){
            return client.query(`
                update movies
                set ${label}=$1
                where imdb_id=$2`
            , [value, imdb_id]);
        }
    }
    const client = new Client();
    await client.connect();
    const { rows }: { rows: Movie[] } = await client.query("select * from movies where id >= $1 and id <= $2;", [start, end]);
    const queryPromises = rows.map(async row => {
        const details = await fetchOMDB(row.imdb_id);
        const imdbVotesInt = details.imdbVotes
                .split("")
                .filter(c => c != ',')
                .join("");
        const runtimeInt = details.Runtime.slice(0, -4);
        await updateValue(row.imdb_id, details.imdbRating, "imdbRating");
        await updateValue(row.imdb_id, details.Awards, "awards");
        await updateValue(row.imdb_id, details.Metascore, "metascore");
        await updateValue(row.imdb_id, imdbVotesInt, "imdbVotes");
        await updateValue(row.imdb_id, details.Plot, "plot");
        await updateValue(row.imdb_id, details.genre, "genre");
        await updateValue(row.imdb_id, runtimeInt, "runtime");
    });
    await Promise.all(queryPromises);
    
    await client.end();
}

async function dropAndPopulate() {
    // await dropDB();
    // await initializeDB();
    // await populateDB();
    await populateOMDB(1, 10);
}

dropAndPopulate();