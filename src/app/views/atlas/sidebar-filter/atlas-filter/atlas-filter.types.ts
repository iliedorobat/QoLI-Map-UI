import {LIFE_INDEX_CATEGORIES, LIFE_INDEX_LABELS} from '@/app/shared/constants/app.const';

export type AtlasFilter = {
    category: LIFE_INDEX_CATEGORIES | null;
    categoryLabel: LIFE_INDEX_LABELS | null;
    year: number | null;
    isDisabled: Function;
    isEmpty: Function;
};

export class AtlasFilterConstructor {
    public category: LIFE_INDEX_CATEGORIES | null = null;
    public categoryLabel: LIFE_INDEX_LABELS | null = null;
    public year: number | null = null;

    constructor(category: LIFE_INDEX_CATEGORIES, year: number) {
        this.category = category;
        this.categoryLabel = LIFE_INDEX_LABELS[category];
        this.year = year;
    }

    public isDisabled() {
        return this.category === null || this.year === null;
    }

    public isEmpty() {
        return this.category === null && this.year === null;
    }
}
