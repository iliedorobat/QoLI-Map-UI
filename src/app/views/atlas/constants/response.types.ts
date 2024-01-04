export interface LifeIndexResponseType {
    [country: string]: number;
}

export interface LifeIndexMultipleResponseType {
    [country: string]: {
        [year: string]: number
    };
}
