export interface Filters {
    runtime: number;
    genres: Genres;
}

interface Genres {
    [key: string]: boolean
}

export type SetFilters = React.Dispatch<React.SetStateAction<Filters>>;