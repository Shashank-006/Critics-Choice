import Card from "./Card";
import { useEffect } from "react";



export default function Content() {
    const vals: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
    useEffect(() => {
        async function fetchAll() {
            const Response = await fetch("http://localhost:3000")
            const ResponseJson = await Response.json();
            console.log(ResponseJson);
        }
        fetchAll();
    }, []);
    return (
        <div className="grid grid-cols-5 w-4/5 self-center">
            {vals.map(val => 
                <Card val={val} key={vals.indexOf(val)}/>
            )}
        </div>
    );
}