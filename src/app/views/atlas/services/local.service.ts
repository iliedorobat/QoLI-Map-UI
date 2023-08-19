import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';

import {AtlasFilterType} from '../sidebar-filter/atlas-filter/atlas-filter.types';
import {LifeIndexMultipleResponseType, LifeIndexResponseType} from '../constants/response.type';
import {LIFE_INDEX_ACCESSORS, LIFE_INDEX_JSON_NAMES} from '../../../shared/constants/app.const';

@Injectable({
    providedIn: 'root'
})
export class LocalService {
    private _lifeIndex$: BehaviorSubject<LifeIndexResponseType> = new BehaviorSubject<LifeIndexResponseType>({} as LifeIndexResponseType);

    private prepareLifeIndexResponse(payload: AtlasFilterType, data: LifeIndexMultipleResponseType): LifeIndexResponseType {
        const countries = Object.keys(data);
        const year = payload.year;

        return countries.reduce((acc, country) => {
            // Remove the 'default' key added by the 'import' statement
            if (typeof year === 'string' && country !== 'default') {
                acc[country] = data[country][year];
            }
            return acc;
        }, {} as LifeIndexResponseType);
    }

    public getLifeIndex(payload: AtlasFilterType): Observable<LifeIndexResponseType> {
        const accessor = payload.category || LIFE_INDEX_ACCESSORS.QOLI;
        const fileName = LIFE_INDEX_JSON_NAMES[accessor];
        const promise = import(`../../../../../files/life-index/countries/${fileName}.json`)
            .then((data: LifeIndexMultipleResponseType) => this.prepareLifeIndexResponse(payload, data));

        return from(promise);
    }

    public lifeIndexSubscription(payload: AtlasFilterType) {
        this.getLifeIndex(payload)
            .subscribe((data: LifeIndexResponseType) => {
                this._lifeIndex$.next(data);
            })
    }

    get lifeIndex$() {
        return this._lifeIndex$.asObservable();
    }
}