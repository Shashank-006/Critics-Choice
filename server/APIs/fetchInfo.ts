import dotenv from "dotenv";
dotenv.config();

interface OMDBResult {
    imdbRating: string,
    imdbVotes: string,
    Metascore: string,
    Genre: string,
    Plot: string,
    Runtime: string,
    Awards: string,
    [key: string]: any
}

export async function fetch250WatchMode(page: number, type: string) {
    const netflix = '203';
    const url = `https://api.watchmode.com/v1/list-titles/?apiKey=${process.env.WATCHMODE_KEY || ""}&source_ids=${netflix}&types=${type}&limit=250&page=${page}`;

    const Response = await fetch(url);
    const res = await Response.json();
    console.log(res);
    return res;
}

export async function fetchOMDB(imdb_id: string): Promise<OMDBResult> {
    const url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY || ""}&i=${imdb_id}`

    const Response = await fetch(url);
    const res = await Response.json();
    return res;
}