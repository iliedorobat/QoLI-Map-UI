import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import cloneDeep from 'lodash-es/cloneDeep';

import {AtlasFilter, IAtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';
// TODO: revisit: create an API to get config data
import {config} from './atlas-filter-main-section/temp.const';
import {IQoLI} from '@/app/views/atlas/constants/qoli.types';
import {AtlasBaseFilter} from './atlas-filter-main-section/atlas-filter-main-section.component.types';

import {DEFAULT_YEAR} from '@/app/shared/constants/app.const';

@Injectable({
    providedIn: 'root',
})
export class AtlasFilterService {
    // Store data after the filter is applied
    private memoizedFilter: IAtlasFilter;
    // Store temporary data before the filter is applied
    private transitoryFilter: IAtlasFilter;

    constructor() {
        this.memoizedFilter = this.createNewFilter();
        this.transitoryFilter = this.createNewFilter();
    }

    private createNewFilter(filter?: IAtlasFilter) {
        const qoliOptions = cloneDeep(filter?.baseFilter.qoliOptions) ?? cloneDeep(config) as IQoLI;
        const year = filter?.baseFilter.year || DEFAULT_YEAR;

        const primaryAtlasFilter = new AtlasBaseFilter(qoliOptions, year);
        return new AtlasFilter(primaryAtlasFilter);
    }

    public initializeFilterForm(filter: IAtlasFilter) {
        const controls: {[key: string]: FormControl} = {};

        for (const dimension of filter.baseFilter.qoliOptions.aggregators) {
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
            this.transitoryFilter.resetFilter(this.memoizedFilter.baseFilter.qoliOptions);
        }

        return this.transitoryFilter;
    }

    public memoizeFilter(filter: IAtlasFilter): void {
        this.memoizedFilter = this.createNewFilter(filter);
    }

    public reset(form: FormGroup): void {
        this.transitoryFilter.reset(form, this.memoizedFilter.baseFilter.qoliOptions);
    }
}
