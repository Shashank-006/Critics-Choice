export default function Card({ val }: {val: number}) {
    return (
        <div className="aspect-square bg-slate-600 rounded-3xl p-2 m-2">
            {val}
        </div>
    );
}