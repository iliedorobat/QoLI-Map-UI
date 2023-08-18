import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {AtlasFilterType} from './atlas-filter.types';
import {LIFE_INDEX_ACCESSORS} from '../../../../shared/constants/app.const';
import {LIFE_INDEX_CATEGORIES} from './atlas-filter.enums';

@Injectable({
    providedIn: 'root',
})
export class AtlasFilterService {
    public initFilter = (): AtlasFilterType => new AtlasFilterType(LIFE_INDEX_ACCESSORS.QOLI, '2022');

    public initFilterForm = (filter: AtlasFilterType): FormGroup => new FormGroup({
        category: new FormControl(filter.category, []),
        categoryLabel: new FormControl(filter.categoryLabel, []),
        year: new FormControl(filter.year, [])
    });

    public getCategory = (categoryLabel: LIFE_INDEX_CATEGORIES | null): LIFE_INDEX_ACCESSORS => {
        const index = categoryLabel
            ? Object.values(LIFE_INDEX_CATEGORIES).indexOf(categoryLabel)
            : -1;
        return Object.keys(LIFE_INDEX_CATEGORIES)[index] as LIFE_INDEX_ACCESSORS;
    }
}
