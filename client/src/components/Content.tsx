import Card from "./Card";
import { useEffect, useState } from "react";
import type { MovieDB, MovieRanked } from "../types/movie";

export default function Content() {
    const [movieContent, setMovieContent] = useState<MovieRanked[]>([]);
    useEffect(() => {
        async function fetchAll() {
            const Response = await fetch("http://localhost:3000")
            const ResponseJson = await Response.json();
            const movies = ResponseJson.map((movie: MovieDB, idx: number) => {
                return {...movie, ranking: idx + 1};
            });
            console.log(movies);
            setMovieContent(movies);
        }
        fetchAll();
    }, []);
    return (
        <>
        <div className="grid grid-cols-5 w-4/5 self-center">
            {movieContent.map(movie => {
                const { id, ...movieRest } = movie;
                return <Card movie={movieRest} key={id}/>
            })}
        </div>
        </>
    );
}