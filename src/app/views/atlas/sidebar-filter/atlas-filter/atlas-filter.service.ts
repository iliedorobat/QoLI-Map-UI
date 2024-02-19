import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {IAtlasFilter, AtlasFilter} from './atlas-filter.types';
import {PrimaryAtlasFilter} from './atlas-filter-main-section/atlas-filter-main-section.types';
import {IQoLI} from '@/app/views/atlas/constants/qoli.types';

@Injectable({
    providedIn: 'root',
})
export class AtlasFilterService {
    // Store data after the filter is applied
    private memoizedFilter: IAtlasFilter = new AtlasFilter();
    // Store temporary data before the filter is applied
    private transitoryFilter: IAtlasFilter = new AtlasFilter();

    public initializeFilterForm(qoliFilter: IQoLI) {
        const controls: {[key: string]: FormControl} = {};

        for (const dimension of qoliFilter.aggregators) {
            const dimKey = dimension.filename;
            controls[dimKey] = new FormControl(dimension.checked);

            for (const indicator of dimension.aggregators) {
                const indKey = `${dimKey}:${indicator.filename}`;
                controls[indKey] = new FormControl(indicator.checked);
            }
        }

        return new FormGroup(controls);
    }

    /** @deprecated in favour of initializeFilterForm
     * TODO: replace with initializeFilterForm */
    public createFilterForm(filter: IAtlasFilter): FormGroup {
        return new FormGroup({
            category: new FormControl(filter.primary.category, []),
            categoryLabel: new FormControl(filter.primary.categoryLabel, []),
            year: new FormControl(filter.primary.year, [])
        });
    }

    public getMemoizedFilter(): IAtlasFilter {
        return this.memoizedFilter;
    }

    public getTransitoryFilter(reset?: boolean): IAtlasFilter {
        if (reset) {
            // Reset the transitoryFilter when the user open the filter bar (AtlasFilterComponent is mounted)
            this.resetFilter(this.transitoryFilter);
        }

        return this.transitoryFilter;
    }

    public memoizeFilter(filter: IAtlasFilter): void {
        const primary = new PrimaryAtlasFilter(filter.primary.category, filter.primary.year);
        this.memoizedFilter = new AtlasFilter(primary);
    }

    public resetFilter(filter: IAtlasFilter): void {
        filter.reset(this.memoizedFilter);
    }

    public resetFilterForm(form: FormGroup): void {
        form.controls['category'].setValue(this.memoizedFilter.primary.category);
        form.controls['categoryLabel'].setValue(this.memoizedFilter.primary.categoryLabel);
        form.controls['year'].setValue(this.memoizedFilter.primary.year);
    }
}
