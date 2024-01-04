import {LIFE_INDEX_ACCESSORS} from '@/app/shared/constants/app.const';
import {LIFE_INDEX_LABELS} from './atlas-filter.enums';

export type AtlasFilter = {
    category: LIFE_INDEX_ACCESSORS | null;
    categoryLabel: LIFE_INDEX_LABELS | null;
    year: string | null;
    isDisabled: Function;
    isEmpty: Function;
};

export class AtlasFilterConstructor {
    public category: LIFE_INDEX_ACCESSORS | null = null;
    public categoryLabel: LIFE_INDEX_LABELS | null = null;
    public year: string | null = null;

    constructor(category: LIFE_INDEX_ACCESSORS, year: string) {
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
