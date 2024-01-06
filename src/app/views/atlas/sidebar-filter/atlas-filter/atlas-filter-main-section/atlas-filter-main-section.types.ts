import isNil from 'lodash-es/isNil';

import {
    AVAILABLE_INTERVAL,
    DEFAULT_YEAR,
    LIFE_INDEX_CATEGORIES,
    LIFE_INDEX_LABELS
} from '@/app/shared/constants/app.const';

export interface IPrimaryAtlasFilter {
    category: LIFE_INDEX_CATEGORIES;
    categoryLabel: LIFE_INDEX_LABELS;
    year: number;
    isDisabled: Function;
    isEmpty: Function;
    onCategoryChanges: Function;
    onYearChanges: Function;
    reset: Function;
}

export class PrimaryAtlasFilter implements IPrimaryAtlasFilter {
    public category;
    public categoryLabel;
    public year;

    constructor(category?: LIFE_INDEX_CATEGORIES, year?: number) {
        this.category = category ?? LIFE_INDEX_CATEGORIES.QOLI;
        this.categoryLabel = LIFE_INDEX_LABELS[this.category];
        this.year = year ?? DEFAULT_YEAR;
    }

    public isDisabled(): boolean {
        return isNil(this.category) || isNil(this.year);
    }

    public isEmpty(): boolean {
        return isNil(this.category) && isNil(this.year);
    }

    public onCategoryChanges(index: number): void {
        this.category = Object.values(LIFE_INDEX_CATEGORIES)[index] as LIFE_INDEX_CATEGORIES;
        this.categoryLabel = LIFE_INDEX_LABELS[this.category];
    }

    public onYearChanges(index: number): void {
        this.year = AVAILABLE_INTERVAL[index];
    }

    public reset(primary?: IPrimaryAtlasFilter): void {
        const {
            category = LIFE_INDEX_CATEGORIES.QOLI,
            year = DEFAULT_YEAR
        } = primary || {};

        this.category = category;
        this.categoryLabel = LIFE_INDEX_LABELS[category];
        this.year = year;
    }
}
