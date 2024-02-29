import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {AtlasBaseFilter} from './atlas-filter-main-section/atlas-filter-main-section.component.types';
import {AtlasFilter, IAtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';
import {IQoLIOptions} from '@/app/views/atlas/constants/qoliOptions.types';

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
    private readonly filter: IAtlasFilter;

    constructor() {
        const primaryAtlasFilter = new AtlasBaseFilter();
        this.filter = new AtlasFilter(primaryAtlasFilter);
    }

    public getFilter(): IAtlasFilter {
        return this.filter;
    }
}
