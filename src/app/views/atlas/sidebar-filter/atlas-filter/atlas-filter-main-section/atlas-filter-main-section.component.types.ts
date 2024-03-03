import {FormControl, FormGroup} from '@angular/forms';

import {IQoLIOptions} from '@/app/views/atlas/constants/qoliOptions.types';
import qoliConfig from '@/app/views/atlas/constants/qoliOptions';

import {DEFAULT_YEAR} from '@/app/shared/constants/app.const';
import {EU28_MEMBER_CODES} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.service';
import {IAtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';

export interface IAtlasBaseFilter {
    countries: string[];
    qoliOptions: IQoLIOptions;
    year: number;
    isDisabled(form: FormGroup): boolean;
    isEmpty(form: FormGroup): boolean;
    initForm(): FormGroup;
    resetForm(form: FormGroup): void;
    saveFilter(form: FormGroup): void;
}

export class AtlasBaseFilter implements IAtlasBaseFilter {
    public countries: string[] = [...EU28_MEMBER_CODES];
    public qoliOptions: IQoLIOptions = qoliConfig;
    public year: number = DEFAULT_YEAR;

    isDisabled(form: FormGroup): boolean {
        // TODO: revisit (||)
        return false;
    }

    isEmpty(form: FormGroup): boolean {
        return false;
    }

    public initForm(): FormGroup {
        const controls: {[key: string]: FormControl} = {};
        controls['countries'] = new FormControl(this.countries);
        controls['year'] = new FormControl(this.year);

        const qoliKey = this.qoliOptions.filename;
        controls[qoliKey] = new FormControl(this.qoliOptions.checked);

        for (const dimension of this.qoliOptions.aggregators) {
            const dimKey = dimension.filename;
            controls[dimKey] = new FormControl(dimension.checked);

            for (const indicator of dimension.aggregators) {
                const indKey = `${dimKey}:${indicator.filename}`;
                controls[indKey] = new FormControl(indicator.checked);
            }
        }

        return new FormGroup(controls);
    }

    resetForm(form: FormGroup): void {
        for (const dimension of this.qoliOptions.aggregators) {
            const dimensionName = dimension.filename;
            form.controls[dimensionName].setValue(dimension.checked);

            const indicators = dimension.aggregators;
            for (const indicator of indicators) {
                form.controls[`${dimensionName}:${indicator.filename}`].setValue(indicator.checked);
            }
        }

        form.controls['year'].setValue(this.year);
        form.controls['countries'].setValue([...this.countries]);
    }

    saveFilter(form: FormGroup): void {
        this.countries = form.value['countries'];
        this.year = form.value['year'];

        this.qoliOptions.checked = this.qoliOptions.aggregators.every(aggr => form.value[aggr.filename]);

        for (const dimension of this.qoliOptions.aggregators) {
            const dimKey = dimension.filename;
            dimension.checked = form.value[dimKey];

            for (const indicator of dimension.aggregators) {
                const indKey = `${dimKey}:${indicator.filename}`;
                indicator.checked = form.value[indKey];
            }
        }
    }
}
