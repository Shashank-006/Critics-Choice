import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content"
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import type { Filters } from "./types/filters";

export default function Page() {
    const [filters, setFilters] = useState<Filters>({runtime: 10});
    const setRuntime = (runtime: number) => setFilters( { ...filters, runtime} )
    return (
        <div className="flex justify-between flex-col h-full w-full">
            <Header />
            <div className="flex">
                <Sidebar filters={filters} filterSetters={{setRuntime}}/>
                <Content filters={filters}/>
            </div>
            <Footer />
        </div>
    );
}