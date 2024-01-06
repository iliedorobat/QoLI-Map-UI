import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {AtlasFilter, AtlasFilterConstructor} from './atlas-filter.types';
import {PrimaryAtlasFilterConstructor} from './atlas-filter-main-section/atlas-filter-main-section.types';

@Injectable({
    providedIn: 'root',
})
export class AtlasFilterService {
    // Store data after the filter is applied
    private memoizedFilter: AtlasFilter = new AtlasFilterConstructor();
    // Store temporary data before the filter is applied
    private transitoryFilter: AtlasFilter = new AtlasFilterConstructor();

    public getMemoizedFilter(): AtlasFilter {
        return this.memoizedFilter;
    }

    public getTransitoryFilter(reset?: boolean): AtlasFilter {
        if (reset) {
            // Reset the transitoryFilter when the user open the filter bar (AtlasFilterComponent is mounted)
            this.resetFilter(this.transitoryFilter);
        }

        return this.transitoryFilter;
    }

    public setMemoizedFilter(filter: AtlasFilter): void {
        const primary = new PrimaryAtlasFilterConstructor(filter.primary.category, filter.primary.year);
        this.memoizedFilter = new AtlasFilterConstructor(primary);
    }

    public createFilterForm(filter: AtlasFilter): FormGroup {
        return new FormGroup({
            category: new FormControl(filter.primary.category, []),
            categoryLabel: new FormControl(filter.primary.categoryLabel, []),
            year: new FormControl(filter.primary.year, [])
        });
    }

    public resetFilter(filter: AtlasFilter): void {
        filter.reset(this.memoizedFilter);
    }

    public resetFilterForm(form: FormGroup): void {
        form.controls['category'].setValue(this.memoizedFilter.primary.category);
        form.controls['categoryLabel'].setValue(this.memoizedFilter.primary.categoryLabel);
        form.controls['year'].setValue(this.memoizedFilter.primary.year);
    }
}
