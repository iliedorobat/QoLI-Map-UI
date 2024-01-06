import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';

import {IAtlasFilter} from '../sidebar-filter/atlas-filter/atlas-filter.types';
import {LifeIndexMultipleResponses, LifeIndexResponse} from '../constants/response.types';

import {LIFE_INDEX_CATEGORIES, LIFE_INDEX_JSON_NAMES} from '@/app/shared/constants/app.const';

@Injectable({
    providedIn: 'root'
})
export class LocalService {
    private _lifeIndex$: BehaviorSubject<LifeIndexResponse> = new BehaviorSubject<LifeIndexResponse>({} as LifeIndexResponse);

    private prepareLifeIndexResponse(payload: IAtlasFilter, data: LifeIndexMultipleResponses): LifeIndexResponse {
        const countries = Object.keys(data);
        const year = payload.primary.year;

        return countries.reduce((acc, country) => {
            // Remove the 'default' key added by the 'import' statement
            if (typeof year === 'number' && country !== 'default') {
                acc[country] = data[country][year];
            }
            return acc;
        }, {} as LifeIndexResponse);
    }

    public getLifeIndex(payload: IAtlasFilter): Observable<LifeIndexResponse> {
        const accessor = payload.primary.category || LIFE_INDEX_CATEGORIES.QOLI;
        const fileName = LIFE_INDEX_JSON_NAMES[accessor];
        const promise = import(`@/../files/life-index/countries/${fileName}.json`)
            .then((data: LifeIndexMultipleResponses) => this.prepareLifeIndexResponse(payload, data));

        return from(promise);
    }

    public lifeIndexSubscription(payload: IAtlasFilter): void {
        this.getLifeIndex(payload)
            .subscribe((data: LifeIndexResponse) => {
                this._lifeIndex$.next(data);
            })
    }

    get lifeIndex$(): Observable<LifeIndexResponse> {
        return this._lifeIndex$.asObservable();
    }
}
