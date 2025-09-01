export interface MovieDB {
    id: number;
    title: string;
    img: string;
    imdbrating?: number;
    imdbvotes?: number;
    metascore?: number;
    runtime?: number;
    plot?: string;
    awards?: string;
    genre?: string;
    year?: number;
}

export interface MovieRanked extends MovieDB {
    ranking: number
}