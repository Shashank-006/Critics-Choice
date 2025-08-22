import type { MovieRanked } from "../types/movie";

export default function Card({ movie }: { movie: Omit<MovieRanked, "id">}) {
    return (
        <div className="aspect-square bg-slate-600 rounded-3xl p-2 m-2 flex flex-col items-center hover:bg-slate-700">
            <div className="">
                {movie.ranking}
            </div>
            <img src={movie.img} alt={`Poster of ${movie.title}`} />
            {`${movie.rating} / 10`}

        </div>
    );
}