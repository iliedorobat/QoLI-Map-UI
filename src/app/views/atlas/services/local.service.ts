import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';

import {AtlasFilter} from '../sidebar-filter/atlas-filter/atlas-filter.types';
import {LifeIndexMultipleResponse, LifeIndexResponse} from '../constants/response.types';

import {LIFE_INDEX_ACCESSORS, LIFE_INDEX_JSON_NAMES} from '@/app/shared/constants/app.const';

@Injectable({
    providedIn: 'root'
})
export class LocalService {
    private _lifeIndex$: BehaviorSubject<LifeIndexResponse> = new BehaviorSubject<LifeIndexResponse>({} as LifeIndexResponse);

    private prepareLifeIndexResponse(payload: AtlasFilter, data: LifeIndexMultipleResponse): LifeIndexResponse {
        const countries = Object.keys(data);
        const year = payload.year;

        return countries.reduce((acc, country) => {
            // Remove the 'default' key added by the 'import' statement
            if (typeof year === 'string' && country !== 'default') {
                acc[country] = data[country][year];
            }
            return acc;
        }, {} as LifeIndexResponse);
    }

    public getLifeIndex(payload: AtlasFilter): Observable<LifeIndexResponse> {
        const accessor = payload.category || LIFE_INDEX_ACCESSORS.QOLI;
        const fileName = LIFE_INDEX_JSON_NAMES[accessor];
        const promise = import(`@/../files/life-index/countries/${fileName}.json`)
            .then((data: LifeIndexMultipleResponse) => this.prepareLifeIndexResponse(payload, data));

        return from(promise);
    }

    public lifeIndexSubscription(payload: AtlasFilter) {
        this.getLifeIndex(payload)
            .subscribe((data: LifeIndexResponse) => {
                this._lifeIndex$.next(data);
            })
    }

    get lifeIndex$() {
        return this._lifeIndex$.asObservable();
    }
}
