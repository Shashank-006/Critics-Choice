import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content"
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { genreList } from "./constants";
import type { Filters } from "./types/filters";
import type { Genres } from "./types/filters";

const genres = genreList.reduce((acc: Genres, genre) => {
        acc[genre] = false;
        return acc;
    }, {});

export default function Page() {

    const [filters, setFilters] = useState<Filters>({runtime: 10, genres});
    const setRuntime = (runtime: number) => setFilters( { ...filters, runtime} );
    const setGenre = (genre: string, value: boolean)  => {
        setFilters({ ...filters, genres: {...(filters.genres), [genre]: value}});
    }
    return (
        <div className="flex justify-between flex-col h-full w-full">
            <Header />
            <div className="flex">
                <Sidebar filters={filters} filterSetters={{setRuntime, setGenre}}/>
                <Content filters={filters}/>
            </div>
            <Footer />
        </div>
    );
}