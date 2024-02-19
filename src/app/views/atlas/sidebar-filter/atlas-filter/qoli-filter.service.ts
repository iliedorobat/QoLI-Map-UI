import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import cloneDeep from 'lodash-es/cloneDeep';

import {config} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter-main-section/temp.const';
import {IQoLI} from '@/app/views/atlas/constants/qoli.types';

@Injectable({
    providedIn: 'root',
})
export class QoliFilterService {
    // Store data after the filter is applied
    private memoizedFilter: IQoLI = cloneDeep(config) as IQoLI;
    // Store temporary data before the filter is applied
    private transitoryFilter: IQoLI = cloneDeep(config) as IQoLI;

    public initializeFilterForm(qoliFilter: IQoLI) {
        const controls: {[key: string]: FormControl} = {};

        for (const dimension of qoliFilter.aggregators) {
            const dimKey = dimension.filename;
            controls[dimKey] = new FormControl(dimension.checked);

            for (const indicator of dimension.aggregators) {
                const indKey = `${dimKey}:${indicator.filename}`;
                controls[indKey] = new FormControl(indicator.checked);
            }
        }

        return new FormGroup(controls);
    }

    public getMemoizedFilter(): IQoLI {
        return this.memoizedFilter;
    }

    public getTransitoryFilter(reset?: boolean): IQoLI {
        if (reset) {
            this.resetFilter();
        }

        return this.transitoryFilter;
    }

    public memoizeFilter(qoliFilter: IQoLI): void {
        this.memoizedFilter = cloneDeep(qoliFilter) as IQoLI;
    }

    public resetFilter(): void {
        this.transitoryFilter = cloneDeep(this.memoizedFilter) as IQoLI;
    }

    public resetFilterForm(form: FormGroup): void {
        const dimensions = this.memoizedFilter.aggregators;

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
