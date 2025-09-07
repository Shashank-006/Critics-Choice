import type { Filters } from "../types/filters";

export default function Sidebar({ filters, filterSetters }: {filters: Filters, filterSetters: {setRuntime: (runtime: number) => void, setGenre: (genre: string, value: boolean) => void}}) {
    console.log(filters, filterSetters)
    const genreList = ["Drama", "Romance", "Comedy", "Sport", "Fantasy", "Mystery", "Action", "Thriller", "Horror", "Sci-Fi", "Crime", "Adventure"];

    return (
        <div className="w-44 p-2 bg-zinc-500">
            Filters: 
            <div>
                <label htmlFor="runtime">{`Max Runtime: ${filters.runtime} hours`}</label>
                <input onChange={(e) => {
                    filterSetters.setRuntime(Number(e.target.value))
                }}
                value={filters.runtime} type="range" min="0" max="10" id="runtime" name="runtime" />
            </div>
            Genres: 
            {
                genreList.map(genre => {   
                    return (
                    <div>
                        <label htmlFor={`genre${genre}`}>{genre}:</label>
                        <input type="checkbox" id={genre} name={genre} checked={filters.genres[genre]} onChange={(e) => filterSetters.setGenre(genre, Boolean(e.target.checked))}/>
                    </div>
                    );  
                })
            }
        </div>
    );
}