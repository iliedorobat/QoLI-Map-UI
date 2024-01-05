export interface LifeIndexResponse {
    [country: string]: number;
}

export interface LifeIndexMultipleResponses {
    [country: string]: {
        [year: string]: number;
    };
}
