export interface Filters {
    runtime: number;
    genres: Genres;
}

export interface Genres {
    [key: string]: boolean
}

export type SetFilters = React.Dispatch<React.SetStateAction<Filters>>;