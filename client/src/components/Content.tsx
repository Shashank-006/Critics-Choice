import Card from "./Card";
import { useEffect, useState } from "react";
import type { MovieDB, MovieRanked } from "../types/movie";
import type { Filters } from "../types/filters";

export default function Content({ filters }: {filters: Filters}) {
    const [movieContent, setMovieContent] = useState<MovieRanked[]>([]);
    useEffect(() => {
        async function fetchAll() {
            const Response = await fetch(`http://localhost:3000/getMovies?maxRuntime=${filters.runtime}`);
            const ResponseJson = await Response.json();
            const movies = ResponseJson.map((movie: MovieDB, idx: number) => {
                return {...movie, ranking: idx + 1};
            });
            console.log(movies);
            setMovieContent(movies);
        }
        fetchAll();
    }, [filters]);
    return (
        <>
        <div className="grid grid-cols-5 w-4/5 mx-auto">
            {movieContent.map(movie => {
                const { id, ...movieRest } = movie;
                return <Card movie={movieRest} key={id}/>
            })}
        </div>
        </>
    );
}