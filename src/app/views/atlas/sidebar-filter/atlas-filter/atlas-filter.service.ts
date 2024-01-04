import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {AtlasFilter, AtlasFilterConstructor} from './atlas-filter.types';

import {LIFE_INDEX_ACCESSORS} from '@/app/shared/constants/app.const';
import {LIFE_INDEX_LABELS} from './atlas-filter.enums';

@Injectable({
    providedIn: 'root',
})
export class AtlasFilterService {
    // TODO: use an env constant instead of year 2021 / 2022
    private filter: AtlasFilter = new AtlasFilterConstructor(LIFE_INDEX_ACCESSORS.QOLI, '2021');

    public getFilter() {
        return this.filter;
    }

    public setFilter(filter: AtlasFilter) {
        this.filter = filter;
    }

    public initFilterForm = (filter: AtlasFilter): FormGroup => new FormGroup({
        category: new FormControl(filter.category, []),
        categoryLabel: new FormControl(filter.categoryLabel, []),
        year: new FormControl(filter.year, [])
    });

    public getCategory = (categoryLabel: LIFE_INDEX_LABELS | null): LIFE_INDEX_ACCESSORS => {
        const index = categoryLabel
            ? Object.values(LIFE_INDEX_LABELS).indexOf(categoryLabel)
            : -1;
        return Object.keys(LIFE_INDEX_LABELS)[index] as LIFE_INDEX_ACCESSORS;
    }
}
