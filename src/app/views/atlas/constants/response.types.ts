export type LifeIndexResponse = {
    [country: string]: number;
};

export type LifeIndexMultipleResponses = {
    [country: string]: {
        [year: string]: number;
    };
};
