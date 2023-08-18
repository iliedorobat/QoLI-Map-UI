import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';

import {AtlasFilterType} from '../sidebar-filter/atlas-filter/atlas-filter.types';
import {GeoCollection} from '../constants/geo.types';
import {LIFE_INDEX_ACCESSORS, LIFE_INDEX_JSON_NAMES} from '../../../shared/constants/app.const';

@Injectable({
    providedIn: 'root'
})
export class LocalService {
    private _lifeIndex$: BehaviorSubject<GeoCollection> = new BehaviorSubject<GeoCollection>({} as GeoCollection);

    public getLifeIndex(payload: AtlasFilterType): Observable<GeoCollection> {
        const accessor = payload.category || LIFE_INDEX_ACCESSORS.QOLI;
        const fileName = LIFE_INDEX_JSON_NAMES[accessor];
        const promise = import(`../../../../../files/life-index/countries/${fileName}.json`)
            .then(data => data);

        return from(promise);
    }

    public lifeIndexSubscription(payload: AtlasFilterType) {
        this.getLifeIndex(payload)
            .subscribe((data: GeoCollection) => {
                this._lifeIndex$.next(data);
            })
    }

    get lifeIndex$() {
        return this._lifeIndex$.asObservable();
    }
}
