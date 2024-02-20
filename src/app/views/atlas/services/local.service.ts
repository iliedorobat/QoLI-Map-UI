import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';

import {IAtlasFilter} from '../sidebar-filter/atlas-filter/atlas-filter.types';
import {LifeIndexMultipleResponses, LifeIndexResponse} from '../constants/response.types';

@Injectable({
    providedIn: 'root'
})
export class LocalService {
    private _lifeIndex$: BehaviorSubject<LifeIndexResponse> = new BehaviorSubject<LifeIndexResponse>({} as LifeIndexResponse);

    private prepareLifeIndexResponse(filter: IAtlasFilter, data: LifeIndexMultipleResponses): LifeIndexResponse {
        const countries = Object.keys(data);
        const year = filter.primaryFilter.year;

        return countries.reduce((acc, country) => {
            // Remove the 'default' key added by the 'import' statement
            if (country !== 'default') {
                acc[country] = data[country][year];
            }
            return acc;
        }, {} as LifeIndexResponse);
    }

    public getLifeIndex(filter: IAtlasFilter): Observable<LifeIndexResponse> {
        // FIXME: revisit
        const fileName = 'QoLI';
        const promise = import(`@/../files/life-index/countries/${fileName}.json`)
            .then((data: LifeIndexMultipleResponses) => this.prepareLifeIndexResponse(filter, data));

        return from(promise);
    }

    public lifeIndexSubscription(filter: IAtlasFilter): void {
        this.getLifeIndex(filter)
            .subscribe((data: LifeIndexResponse) => {
                this._lifeIndex$.next(data);
            })
    }

    get lifeIndex$(): Observable<LifeIndexResponse> {
        return this._lifeIndex$.asObservable();
    }
}
