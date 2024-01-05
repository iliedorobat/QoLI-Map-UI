import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {AtlasFilter, AtlasFilterConstructor} from './atlas-filter.types';

@Injectable({
    providedIn: 'root',
})
export class AtlasFilterService {
    private filter: AtlasFilter = new AtlasFilterConstructor();

    public getFilter(): AtlasFilter {
        return this.filter;
    }

    public setFilter(filter: AtlasFilter): void {
        this.filter = filter;
    }

    public getNewFilterForm(filter: AtlasFilter): FormGroup {
        return new FormGroup({
            category: new FormControl(filter.primary.category, []),
            categoryLabel: new FormControl(filter.primary.categoryLabel, []),
            year: new FormControl(filter.primary.year, [])
        });
    }
}
