import {Injectable} from '@angular/core';
import * as _ from 'lodash';

import {LifeIndexResponseType} from '../constants/response.types';
import {GeoFeature} from '../constants/geo.types';
import {SORT_ORDER} from '../../../shared/constants/math.const';

@Injectable({
    providedIn: 'root'
})
export class DatasetService {
    private sortByAsc = (a: Array<string|number>, b: Array<string|number>) => {
        if (a[1] < b[1]) {
            return -1;
        } else if (a[1] > b[1]) {
            return 1;
        }
        return 0;
    }
    private sortByDesc = (a: Array<string|number>, b: Array<string|number>) => {
        if (a[1] > b[1]) {
            return -1;
        } else if (a[1] < b[1]) {
            return 1;
        }
        return 0;
    }

    public getScore = (geoLand: GeoFeature, response: LifeIndexResponseType) => {
        const countryCode = geoLand.id;

        return countryCode && !_.isEmpty(response)
            ? response[countryCode]
            : 0 as number;
    }

    public getSortedResponse = (response: LifeIndexResponseType, sortOrder: SORT_ORDER) => {
        const array = Object.keys(response)
            .map(code => [code, response[code]]);
        const sortMethod = sortOrder === SORT_ORDER.ASC
            ? this.sortByAsc
            : this.sortByDesc;

        array.sort(sortMethod)
        return array;
    }
}
