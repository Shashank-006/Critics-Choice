import dotenv from "dotenv";
dotenv.config();

export async function fetch100(offset: number, type: string) {
    const requestOptions: RequestInit = {
        headers: {
            apikey: process.env.UNOGS_KEY || ""
        }
    }

    const Response = await fetch(`https://api.apilayer.com/unogs/search/titles?limit=100&offset=${offset}&type=${type}`, requestOptions);
    const res = await Response.json();
    return res;
}