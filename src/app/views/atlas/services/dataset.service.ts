import {Injectable} from '@angular/core';

import {LifeIndexResponse} from '../constants/response.types';
import {GeoFeature} from '../constants/geo.types';
import {SidebarFilter} from '@/app/views/sidebar';

import {SORT_ORDER} from '@/app/shared/constants/math.const';

export type DatasetEntry = Array<number | string>;

@Injectable({
    providedIn: 'root'
})
export class DatasetService {
    /** Placeholder used to mark the filtered out countries */
    public EXCLUDED_COUNTRY_SCORE = -1;

    constructor(private sidebarFilter: SidebarFilter) {}

    private sortByAsc(a: DatasetEntry, b: DatasetEntry): number {
        if (a[1] < b[1]) {
            return -1;
        } else if (a[1] > b[1]) {
            return 1;
        }
        return 0;
    }

    private sortByDesc(a: DatasetEntry, b: DatasetEntry): number {
        if (a[1] > b[1]) {
            return -1;
        } else if (a[1] < b[1]) {
            return 1;
        }
        return 0;
    }

    public getScore(geoLand: GeoFeature, response: LifeIndexResponse): number {
        const countryCode = geoLand.id;

        // Use the "-1" placeholder if the country have been filtered out
        return response[countryCode as string] ?? this.EXCLUDED_COUNTRY_SCORE;
    }

    public getScoreStr(geoLand: GeoFeature, response: LifeIndexResponse, precision?: number): string {
        const score = this.getScore(geoLand, response);

        if (this.sidebarFilter.baseFilter.isIndividuallyAnalysis()) {
            return `${score.toFixed(2)} (${this.sidebarFilter.individuallyFilter.getUnits()})`;
        }

        if (!precision) {
            return score.toString();
        }

        return score.toFixed(precision);
    }

    public getSortedResponse(response: LifeIndexResponse, sortOrder: SORT_ORDER): Array<DatasetEntry> {
        const array = Object.keys(response)
            .map(code => [code, response[code]]);
        const sortMethod = sortOrder === SORT_ORDER.ASC
            ? this.sortByAsc
            : this.sortByDesc;

        array.sort(sortMethod)
        return array;
    }
}
