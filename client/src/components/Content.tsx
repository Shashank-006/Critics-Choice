import Card from "./Card";
import { useEffect, useRef } from "react";
import type { MovieDB, MovieRanked } from "../types/movie";
import type { Filters } from "../types/filters";

export default function Content({ filters }: {filters: Filters}) {
    const movieContent = useRef<MovieRanked[]>([]);
    useEffect(() => {
        async function fetchAll() {

            const fetchURL = new URL("http://localhost:3000/getMovies");
            fetchURL.searchParams.append("maxRuntime", String(filters.runtime));
            const Response = await fetch(fetchURL.toString());
            const ResponseJson = await Response.json();
            const movies = ResponseJson.map((movie: MovieDB, idx: number) => {
                return {...movie, ranking: idx + 1};
            });
            console.log(movies);
            movieContent.current = movies;
        }
        fetchAll();
    }, [filters]);
    return (
        <>
        <div className="grid grid-cols-5 w-4/5 mx-auto">
            {movieContent.current.map(movie => {
                const { id, ...movieRest } = movie;
                return <Card movie={movieRest} key={id}/>
            })}
        </div>
        </>
    );
}