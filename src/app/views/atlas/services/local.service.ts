import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';

import {IQoLI} from '@/app/views/atlas/constants/qoli.types';
import {LifeIndexMultipleResponses, LifeIndexResponse} from '../constants/response.types';

@Injectable({
    providedIn: 'root'
})
export class LocalService {
    private _lifeIndex$: BehaviorSubject<LifeIndexResponse> = new BehaviorSubject<LifeIndexResponse>({} as LifeIndexResponse);

    private prepareLifeIndexResponse(payload: IQoLI, data: LifeIndexMultipleResponses): LifeIndexResponse {
        const countries = Object.keys(data);
        const year = '2022'; // FIXME: revisit

        return countries.reduce((acc, country) => {
            // Remove the 'default' key added by the 'import' statement
            if (country !== 'default') {
                acc[country] = data[country][year];
            }
            return acc;
        }, {} as LifeIndexResponse);
    }

    public getLifeIndex(payload: IQoLI): Observable<LifeIndexResponse> {
        // FIXME: revisit
        const fileName = 'QoLI';
        const promise = import(`@/../files/life-index/countries/${fileName}.json`)
            .then((data: LifeIndexMultipleResponses) => this.prepareLifeIndexResponse(payload, data));

        return from(promise);
    }

    public lifeIndexSubscription(payload: IQoLI): void {
        this.getLifeIndex(payload)
            .subscribe((data: LifeIndexResponse) => {
                this._lifeIndex$.next(data);
            })
    }

    get lifeIndex$(): Observable<LifeIndexResponse> {
        return this._lifeIndex$.asObservable();
    }
}
