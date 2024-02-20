import {FormGroup} from '@angular/forms';
import cloneDeep from 'lodash-es/cloneDeep';

import {IQoLI} from '@/app/views/atlas/constants/qoli.types';
import {DEFAULT_YEAR} from '@/app/shared/constants/app.const';

import {config} from './temp.const';

export interface IAtlasBaseFilter {
    qoliOptions: IQoLI;
    year: number;
    isDisabled(): boolean;
    isEmpty(): boolean;
    reset(form: FormGroup, qoliOptions: IQoLI): void;
    resetFilter(qoliOptions?: IQoLI): void;
    resetFilterForm(form: FormGroup, qoliOptions: IQoLI): void;
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

    reset(form: FormGroup, qoliOptions: IQoLI): void {
        this.resetFilterForm(form, qoliOptions);
        this.resetFilter(qoliOptions);
    }

    resetFilter(qoliOptions?: IQoLI): void {
        this.qoliOptions = cloneDeep(qoliOptions) ?? cloneDeep(config) as IQoLI;
        this.year = DEFAULT_YEAR;
    }

    resetFilterForm(form: FormGroup, qoliOptions: IQoLI): void {
        const dimensions = qoliOptions.aggregators;

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
