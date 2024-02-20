import {FormGroup} from '@angular/forms';
import cloneDeep from 'lodash-es/cloneDeep';

import {IQoLI} from '@/app/views/atlas/constants/qoli.types';
import {IAtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';

import {DEFAULT_YEAR} from '@/app/shared/constants/app.const';
import {config} from './temp.const';

export interface IAtlasBaseFilter {
    qoliOptions: IQoLI;
    year: number;
    isDisabled(): boolean;
    isEmpty(): boolean;
    reset(form: FormGroup, memoizedFilter: IAtlasFilter): void;
    resetFilter(memoizedFilter?: IAtlasFilter): void;
    resetFilterForm(form: FormGroup, memoizedFilter: IAtlasFilter): void;
}

export class AtlasBaseFilter implements IAtlasBaseFilter {
    public qoliOptions: IQoLI;
    public year: number;

    constructor(qoliOptions: IQoLI, year?: number) {
        this.qoliOptions = qoliOptions;
        this.year = year ?? DEFAULT_YEAR;
    }

    isDisabled(): boolean {
        // TODO: revisit (||)
        return false;
    }

    isEmpty(): boolean {
        // TODO: revisit (&&)
        return false;
    }

    reset(form: FormGroup, memoizedFilter: IAtlasFilter): void {
        this.resetFilterForm(form, memoizedFilter);
        this.resetFilter(memoizedFilter);
    }

    resetFilter(memoizedFilter?: IAtlasFilter): void {
        const qoliOptions = memoizedFilter?.baseFilter.qoliOptions ?? config;
        this.qoliOptions = cloneDeep(qoliOptions) as IQoLI;
        this.year = memoizedFilter?.baseFilter.year ?? DEFAULT_YEAR;
    }

    resetFilterForm(form: FormGroup, memoizedFilter: IAtlasFilter): void {
        const dimensions = memoizedFilter.baseFilter.qoliOptions.aggregators;

        for (const dimension of dimensions) {
            const dimensionName = dimension.filename;
            form.controls[dimensionName].setValue(dimension.checked);

            const indicators = dimension.aggregators;
            for (const indicator of indicators) {
                form.controls[`${dimensionName}:${indicator.filename}`].setValue(indicator.checked);
            }
        }
    }
}
