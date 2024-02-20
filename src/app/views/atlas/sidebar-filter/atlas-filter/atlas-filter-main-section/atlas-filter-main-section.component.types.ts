import {FormGroup} from '@angular/forms';
import cloneDeep from 'lodash-es/cloneDeep';

import {IAtlasFilterMethods} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';
import {IQoLI} from '@/app/views/atlas/constants/qoli.types';
import {DEFAULT_YEAR} from '@/app/shared/constants/app.const';

import {config} from './temp.const';

export interface IPrimaryAtlasFilter extends IAtlasFilterMethods {
    qoliOptions: IQoLI;
    year: number;
}

// TODO: revisit: rename it to AtlasBaseFilter
export class PrimaryAtlasFilter implements IPrimaryAtlasFilter {
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
