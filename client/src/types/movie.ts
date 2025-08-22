export interface MovieDB {
    id: number;
    title: string;
    img: string;
    rating: number;
}

export interface MovieRanked extends MovieDB {
    ranking: number
}