import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';

import {Filter} from '@/app/shared/filter';
import {IAggrQoLI} from '@/app/views/atlas/constants/qoliOptions.types';
import {LifeIndexMultipleResponses, LifeIndexResponse} from '../constants/response.types';

import {ANALYSIS_TYPE} from '@/app/shared/constants/app.const';
import {MAIN_URI} from '@/app/shared/constants/endpoint';

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    private _datasetConfig$: BehaviorSubject<IAggrQoLI> = new BehaviorSubject<IAggrQoLI>({} as IAggrQoLI);
    private _lifeIndex$: BehaviorSubject<LifeIndexResponse> = new BehaviorSubject<LifeIndexResponse>({} as LifeIndexResponse);

    private prepareLifeIndexResponse(filter: Filter, data: LifeIndexMultipleResponses): LifeIndexResponse {
        const countries = Object.keys(data);
        const year = filter.baseFilter.year;

        return countries.reduce((acc, country) => {
            acc[country] = data[country][year];
            return acc;
        }, {} as LifeIndexResponse);
    }

    private getDatasetConfig(): Observable<IAggrQoLI> {
        const promise = fetch(`${MAIN_URI}/stats/config?analysisType=${ANALYSIS_TYPE.AGGREGATE}`)
            .then(result => result.json());

        return from(promise);
    }

    private getLifeIndex(filter: Filter): Observable<LifeIndexResponse> {
        const aggrs = this.extractAggregators(filter).map(aggr => `aggr=${aggr}`);
        const analysisType = `analysisType=${filter.baseFilter.analysisType}`;
        const countryCodes = filter.baseFilter.countries.map(code => `countryCode=${code}`);
        const startYear = `startYear=${filter.baseFilter.year}`;
        const endYear = `endYear=${filter.baseFilter.year}`;
        const search = [analysisType, startYear, endYear, ...aggrs, ...countryCodes].filter(item => !!item).join('&');

        const promise = fetch(`${MAIN_URI}/stats?${search}`)
            .then(response => response.json())
            .then((data: LifeIndexMultipleResponses) => this.prepareLifeIndexResponse(filter, data));

        return from(promise);
    }

    private extractAggregators(filter: Filter): string[] {
        if (filter.baseFilter.isIndividuallyAnalysis()) {
            return [filter.individuallyFilter.selectedIndicator.filename];
        }

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
            .subscribe((config: IAggrQoLI) => {
                this._datasetConfig$.next(config);
            });
    }

    public lifeIndexSubscription(filter: Filter): void {
        this.getLifeIndex(filter)
            .subscribe((data: LifeIndexResponse) => {
                this._lifeIndex$.next(data);
            })
    }

    get datasetConfig$(): Observable<IAggrQoLI> {
        return this._datasetConfig$.asObservable();
    }

    get lifeIndex$(): Observable<LifeIndexResponse> {
        return this._lifeIndex$.asObservable();
    }
}
