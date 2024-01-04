export interface LifeIndexResponse {
    [country: string]: number;
}

export interface LifeIndexMultipleResponse {
    [country: string]: {
        [year: string]: number
    };
}
