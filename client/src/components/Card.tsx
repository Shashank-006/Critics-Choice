import { useState } from "react";
import type { MovieRanked } from "../types/movie";

export default function Card({ movie }: { movie: Omit<MovieRanked, "id">}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div onClick={() => setIsOpen(!isOpen)} className="aspect-square bg-slate-600 rounded-3xl p-2 m-2 flex flex-col items-center hover:bg-slate-700 active:hover:bg-slate-900">
            <div className="text-center">
                {movie.ranking}
                <br />
                {movie.title}
            </div>
            <img src={movie.img} alt={`Poster of ${movie.title}`} />
            {`${movie.imdbrating} / 10`}
            {isOpen ? <div className="text-center">{movie.plot}</div> : null}
        </div>
    );
}