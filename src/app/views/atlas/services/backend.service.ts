import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';

import {LifeIndexMultipleResponses, LifeIndexResponse} from '../constants/response.types';
import {AtlasFilter} from '../sidebar-filter/atlas-filter/atlas-filter.types';
import {IQoLIOptions} from '@/app/views/atlas/constants/qoliOptions.types';

const MAIN_URL = 'http://localhost:3070';

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    private _datasetConfig$: BehaviorSubject<IQoLIOptions> = new BehaviorSubject<IQoLIOptions>({} as IQoLIOptions);
    private _lifeIndex$: BehaviorSubject<LifeIndexResponse> = new BehaviorSubject<LifeIndexResponse>({} as LifeIndexResponse);

    private prepareLifeIndexResponse(filter: AtlasFilter, data: LifeIndexMultipleResponses): LifeIndexResponse {
        const countries = Object.keys(data);
        const year = filter.baseFilter.year;

        return countries.reduce((acc, country) => {
            acc[country] = data[country][year];
            return acc;
        }, {} as LifeIndexResponse);
    }

    private getDatasetConfig(): Observable<IQoLIOptions> {
        const promise = fetch(`${MAIN_URL}/stats/dataset/config`)
            .then(result => result.json());

        return from(promise);
    }

    private getLifeIndex(filter: AtlasFilter): Observable<LifeIndexResponse> {
        const aggrs = this.extractAggregators(filter).map(aggr => `aggr=${aggr}`);
        const countryCodes = filter.baseFilter.countries.map(code => `countryCode=${code}`);
        const year = `year=${filter.baseFilter.year}`;
        const search = [...aggrs, year, ...countryCodes].filter(item => !!item).join('&');

        const promise = fetch(`${MAIN_URL}/stats?${search}`)
            .then(response => response.json())
            .then((data: any) => this.prepareLifeIndexResponse(filter, data.scores));

        return from(promise);
    }

    private extractAggregators(filter: AtlasFilter): string[] {
        return filter.baseFilter.qoliOptions.aggregators.reduce((acc, dimension) => {
            const arr = [...acc];

            if (dimension.checked) {
                arr.push(dimension.filename);
            } else {
                dimension.aggregators.forEach(indicator => {
                    indicator.checked && arr.push(`${dimension.filename}:${indicator.filename}`);
                });
            }

            return arr;
        }, [] as string[]);
    }

    public datasetConfigSubscription(): void {
        this.getDatasetConfig()
            .subscribe((config: IQoLIOptions) => {
                this._datasetConfig$.next(config);
            });
    }

    public lifeIndexSubscription(filter: AtlasFilter): void {
        this.getLifeIndex(filter)
            .subscribe((data: LifeIndexResponse) => {
                this._lifeIndex$.next(data);
            })
    }

    get datasetConfig$(): Observable<IQoLIOptions> {
        return this._datasetConfig$.asObservable();
    }

    get lifeIndex$(): Observable<LifeIndexResponse> {
        return this._lifeIndex$.asObservable();
    }
}
