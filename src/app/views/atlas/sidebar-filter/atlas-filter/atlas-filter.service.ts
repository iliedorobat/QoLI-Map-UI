import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import cloneDeep from 'lodash-es/cloneDeep';

import {AtlasBaseFilter} from './atlas-filter-main-section/atlas-filter-main-section.component.types';
import {AtlasFilter, IAtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';
// TODO: revisit: create an API to get config data
import {config} from './atlas-filter-main-section/temp.const';
import {IQoLI} from '@/app/views/atlas/constants/qoli.types';

import {DEFAULT_YEAR} from '@/app/shared/constants/app.const';

export const EU28_MEMBERS = {
    // EU: 'European Union', // (EU6-1958, EU9-1973, EU10-1981, EU12-1986, EU15-1995, EU25-2004, EU27-2007, EU28-2013, EU27-2020)
    // EU27_2020: 'European Union - 27 countries', // (from 2020)
    // EU28: 'European Union - 28 countries', // (2013-2020)
    AT: 'Austria',
    BE: 'Belgium',
    BG: 'Bulgaria',
    CY: 'Cyprus',
    CZ: 'Czech Republic',
    DE: 'Germany', // Germany (until 1990 former territory of the FRG)
    DK: 'Denmark',
    EE: 'Estonia',
    EL: 'Greece',
    ES: 'Spain',
    FI: 'Finland',
    FR: 'France',
    HR: 'Croatia',
    HU: 'Hungary',
    IE: 'Ireland',
    IT: 'Italy',
    LT: 'Lithuania',
    LU: 'Luxembourg',
    LV: 'Latvia',
    MT: 'Malta',
    NL: 'Netherlands',
    PL: 'Poland',
    PT: 'Portugal',
    RO: 'Romania',
    SE: 'Sweden',
    SI: 'Slovenia',
    SK: 'Slovakia',
    UK: 'United Kingdom',
} as const;

export const EU28_MEMBER_CODES = Object.keys(EU28_MEMBERS);

@Injectable({
    providedIn: 'root',
})
export class AtlasFilterService {
    private filter: IAtlasFilter;

    constructor() {
        this.filter = this.createNewFilter();
    }

    private createNewFilter() {
        const countries = [...EU28_MEMBER_CODES];
        const qoliOptions = cloneDeep(config) as IQoLI;

        const primaryAtlasFilter = new AtlasBaseFilter(countries, qoliOptions, DEFAULT_YEAR);
        return new AtlasFilter(primaryAtlasFilter);
    }

    public getFilter(): IAtlasFilter {
        return this.filter;
    }

    public saveFilter(form: FormGroup): void {
        this.filter.baseFilter.countries = form.value['countries'];
        this.filter.baseFilter.year = form.value['year'];

        const qoliOptions: IQoLI = this.filter.baseFilter.qoliOptions;
        qoliOptions.checked = qoliOptions.aggregators.every(aggr => form.value[aggr.filename]);

        for (const dimension of qoliOptions.aggregators) {
            const dimKey = dimension.filename;
            dimension.checked = form.value[dimKey];

            for (const indicator of dimension.aggregators) {
                const indKey = `${dimKey}:${indicator.filename}`;
                indicator.checked = form.value[indKey];
            }
        }
    }

    public initializeFilterForm(filter: IAtlasFilter) {
        const controls: {[key: string]: FormControl} = {};
        controls['countries'] = new FormControl(filter.baseFilter.countries);
        controls['year'] = new FormControl(filter.baseFilter.year);

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

    public resetFilterForm(form: FormGroup): void {
        this.filter.resetFilterForm(form, this.filter);
    }
}
