import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {IAtlasFilter, AtlasFilter} from './atlas-filter.types';
import {PrimaryAtlasFilter} from './atlas-filter-main-section/atlas-filter-main-section.types';

@Injectable({
    providedIn: 'root',
})
/** @deprecated in favour of QoliFilterService
 * TODO: revisit: remove
 * */
export class AtlasFilterService {
    // Store data after the filter is applied
    private memoizedFilter: IAtlasFilter = new AtlasFilter();
    // Store temporary data before the filter is applied
    private transitoryFilter: IAtlasFilter = new AtlasFilter();

    public initializeFilterForm(filter: IAtlasFilter) {
        const qoliFilter = filter.primary.category;
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
        // TODO:
        const qoliFilename = this.memoizedFilter.primary.category.filename;
        const dimensions = this.memoizedFilter.primary.category.aggregators;

        for (const dimension of dimensions) {
            const dimensionName = dimension.filename;
            form.controls[dimensionName].setValue(dimension.checked);

            const indicators = dimension.aggregators;
            for (const indicator of indicators) {
                form.controls[`${dimensionName}:${indicator.filename}`].setValue(indicator.checked);
            }
        }

        // TODO:
        // form.controls['year'].setValue(this.memoizedFilter.primary.year);
    }
}
