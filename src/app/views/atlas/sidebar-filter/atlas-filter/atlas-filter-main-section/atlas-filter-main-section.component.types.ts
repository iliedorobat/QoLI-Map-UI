import {FormGroup} from '@angular/forms';

import {IQoLI} from '@/app/views/atlas/constants/qoli.types';
import {IAtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';

import {DEFAULT_YEAR} from '@/app/shared/constants/app.const';

export interface IAtlasBaseFilter {
    countries: string[];
    qoliOptions: IQoLI;
    year: number;
    isDisabled(): boolean;
    isEmpty(): boolean;
    resetFilterForm(form: FormGroup, filter: IAtlasFilter): void;
}

export class AtlasBaseFilter implements IAtlasBaseFilter {
    public countries: string[];
    public qoliOptions: IQoLI;
    public year: number;

    constructor(countries: string[], qoliOptions: IQoLI, year?: number) {
        this.countries = countries;
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

    resetFilterForm(form: FormGroup, filter: IAtlasFilter): void {
        const {countries, qoliOptions, year} = filter.baseFilter;

        for (const dimension of qoliOptions.aggregators) {
            const dimensionName = dimension.filename;
            form.controls[dimensionName].setValue(dimension.checked);

            const indicators = dimension.aggregators;
            for (const indicator of indicators) {
                form.controls[`${dimensionName}:${indicator.filename}`].setValue(indicator.checked);
            }
        }

        form.controls['year'].setValue(year);
        form.controls['countries'].setValue([...countries]);
    }
}
