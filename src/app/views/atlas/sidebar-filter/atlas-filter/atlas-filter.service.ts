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

    // Only used on AtlasFilterComponent to reset the transitoryFilter when the user open the filter bar
    public getInitialTransitoryFilter(): AtlasFilter {
        this.resetTransitoryFilter();
        return this.transitoryFilter;
    }

    public getMemoizedFilter(): AtlasFilter {
        return this.memoizedFilter;
    }

    public getTransitoryFilter(): AtlasFilter {
        return this.transitoryFilter;
    }

    public setMemoizedFilter(filter: AtlasFilter): void {
        const primary = new PrimaryAtlasFilterConstructor(filter.primary.category, filter.primary.year);
        this.memoizedFilter = new AtlasFilterConstructor(primary);
    }

    public setTransitoryFilter(filter: AtlasFilter): void {
        this.transitoryFilter = filter;
    }

    public resetTransitoryFilter(): void {
        const primary = new PrimaryAtlasFilterConstructor(this.memoizedFilter.primary.category, this.memoizedFilter.primary.year);
        this.transitoryFilter = new AtlasFilterConstructor(primary);
    }

    public getInitialFilterForm(): FormGroup {
        const filter = this.memoizedFilter;

        return new FormGroup({
            category: new FormControl(filter.primary.category, []),
            categoryLabel: new FormControl(filter.primary.categoryLabel, []),
            year: new FormControl(filter.primary.year, [])
        });
    }

    public getNewFilterForm(filter: AtlasFilter): FormGroup {
        return new FormGroup({
            category: new FormControl(filter.primary.category, []),
            categoryLabel: new FormControl(filter.primary.categoryLabel, []),
            year: new FormControl(filter.primary.year, [])
        });
    }
}
