import { Client } from "pg";
import { fetch250WatchMode, fetchOMDB, fetchTMDB } from "../APIs/fetchInfo";
import dotenv from "dotenv";
import { count } from "console";
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

function updateValue(idLabel: string, client: Client){
    return (id: string, value: any, label: string) => {
        if(value !== "N/A" && !Number.isNaN(value)) {
            return client.query(`
                update movies
                set ${label}=$1
                where ${idLabel}=$2`
            , [value, id]);
        }
    }
}

async function populateOMDB(start: number, end: number) {
    const client = new Client();
    await client.connect();
    const updateValueIMDB = updateValue("imdb_id", client);
    const { rows }: { rows: Movie[] } = await client.query("select * from movies where id >= $1 and id <= $2;", [start, end]);
    for(const row of rows){
        const details = await fetchOMDB(row.imdb_id);

        const imdbVotesInt = details.imdbVotes
                .split("")
                .filter(c => c != ',')
                .join("");
        const runtimeInt = details.Runtime.slice(0, -4);
        await updateValueIMDB(row.imdb_id, Number(details.imdbRating), "imdbRating");
        await updateValueIMDB(row.imdb_id, details.Awards, "awards");
        await updateValueIMDB(row.imdb_id, Number(details.Metascore), "metascore");
        await updateValueIMDB(row.imdb_id, Number(imdbVotesInt), "imdbVotes");
        await updateValueIMDB(row.imdb_id, details.Plot, "plot");
        await updateValueIMDB(row.imdb_id, details.Genre, "genre");
        await updateValueIMDB(row.imdb_id, Number(runtimeInt), "runtime");
        await updateValueIMDB(row.imdb_id, Number(details.Year), "year");
    } 
    await client.end();
}

async function populateTMDB(start: number, end: number) {
    const client = new Client();
    await client.connect();
    const updateValueTMDB = updateValue("tmdb_id", client);
    const { rows }: { rows: Movie[] } = await client.query("select * from movies where id >= $1 and id <= $2", [start, end]);
    for(const row of rows){
        const details = await fetchTMDB(row.tmdb_id);
        await updateValueTMDB(row.tmdb_id, `https://image.tmdb.org/t/p/w500/${details.poster_path}`, "img");
    }
    await client.end();
}

async function getCount() {
    const client = new Client();
    await client.connect();
    const { rows } = await client.query("select count(*) from movies;");
    await client.end();
    return rows[0].count;
}

async function dropAndPopulate() {
    // await dropDB();
    // await initializeDB();
    // await populateDB();
    const count = await getCount();
    //Usage: Because of rate limiting do groups of 1000, (populateOMDB(1, 1000), populateOMDB(1001, 2000), etc) and change keys for omdb between each run
    // await populateOMDB(1, count);
    // await populateTMDB(1, count);
}

dropAndPopulate();