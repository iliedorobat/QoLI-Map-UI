import {LIFE_INDEX_ACCESSORS} from '../../../../shared/constants/app.const';
import {LIFE_INDEX_CATEGORIES} from './atlas-filter.enums';

export class AtlasFilterType {
    public category: LIFE_INDEX_ACCESSORS | null = null;
    public categoryLabel: LIFE_INDEX_CATEGORIES | null = null;
    public year: string | null = null;

    constructor(category: LIFE_INDEX_ACCESSORS, year: string) {
        this.category = category;
        this.categoryLabel = LIFE_INDEX_CATEGORIES[category];
        this.year = year;
    }

    public isDisabled() {
        return this.category === null || this.year === null;
    }

    public isEmpty() {
        return this.category === null && this.year === null;
    }
}
