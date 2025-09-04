import type { Filters } from "../types/filters";

export default function Sidebar({ filters, filterSetters }: {filters: Filters, filterSetters: {setRuntime: (runtime: number) => void}}) {
    console.log(filters, filterSetters)
    return (
        <>
        <div className="w-44 p-2 bg-zinc-500">
            Filters: 
            <br />
            <label htmlFor="runtime">{`Max Runtime: ${filters.runtime} hours`}</label>
            <input onChange={(e) => {
                filterSetters.setRuntime(Number(e.target.value))
             }}
             value={filters.runtime} type="range" min="0" max="10" id="runtime" name="runtime"/>
            
        </div>
        </>
    );
}