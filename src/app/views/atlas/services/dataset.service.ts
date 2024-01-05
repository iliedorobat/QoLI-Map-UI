import {Injectable} from '@angular/core';
import isEmpty from 'lodash-es/isEmpty';

import {LifeIndexResponse} from '../constants/response.types';
import {GeoFeature} from '../constants/geo.types';

import {SORT_ORDER} from '@/app/shared/constants/math.const';

export type DatasetEntry = Array<number | string>;

@Injectable({
    providedIn: 'root'
})
export class DatasetService {
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

        return countryCode && !isEmpty(response)
            ? response[countryCode]
            : 0 as number;
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
