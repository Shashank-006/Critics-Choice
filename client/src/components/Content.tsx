import Card from "./Card";

export default function Content() {
    const vals: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <div className="grid grid-cols-5 w-4/5 self-center">
            {vals.map(val => 
                <Card val={val} key={vals.indexOf(val)}/>
            )}
        </div>
    );
}