import {DEFAULT_YEAR, LIFE_INDEX_CATEGORIES, LIFE_INDEX_LABELS} from '@/app/shared/constants/app.const';

export interface PrimaryAtlasFilter {
    category: LIFE_INDEX_CATEGORIES;
    categoryLabel: LIFE_INDEX_LABELS;
    year: number;
    isDisabled: Function;
    isEmpty: Function;
}

export class PrimaryAtlasFilterConstructor implements PrimaryAtlasFilter {
    public category;
    public categoryLabel;
    public year;

    constructor(category?: LIFE_INDEX_CATEGORIES, year?: number) {
        this.category = category ?? LIFE_INDEX_CATEGORIES.QOLI;
        this.categoryLabel = LIFE_INDEX_LABELS[this.category];
        this.year = year ?? DEFAULT_YEAR;
    }

    public isDisabled() {
        return this.category === null || this.year === null;
    }

    public isEmpty() {
        return this.category === null && this.year === null;
    }
}
