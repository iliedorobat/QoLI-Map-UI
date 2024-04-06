import {FormControl, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

import {IQoLIOptions} from '@/app/views/atlas/constants/qoliOptions.types';
import qoliConfig from '@/app/views/atlas/constants/qoliOptions';

import {DEFAULT_YEAR, EU28_MEMBER_CODES} from '@/app/shared/constants/app.const';

export interface IAtlasAggregatedFilter {
    countries: string[];
    qoliOptions: IQoLIOptions;
    selectedCountries: string[];
    selectedIndicators: string[];
    year: number;

    areAllCountriesChecked(): boolean;
    areAllDimensionsChecked(): boolean;
    initForm(controls: {[key: string]: FormControl}): void;
    isDisabled(form: FormGroup): boolean;
    isEmpty(form: FormGroup): boolean;
    reset(form: FormGroup): void;
    save(form: FormGroup): void;
}

@Injectable({
    providedIn: 'root',
})
export class AtlasAggregatedFilter implements IAtlasAggregatedFilter {
    public countries: string[] = [...EU28_MEMBER_CODES];
    public qoliOptions: IQoLIOptions = qoliConfig;
    public year: number = DEFAULT_YEAR;

    public selectedCountries: string[] = this.initSelectedCountries();
    public selectedIndicators: string[] = this.initSelectedIndicators();

    areAllCountriesChecked(): boolean {
        return this.selectedCountries.length === EU28_MEMBER_CODES.length;
    }

    areAllDimensionsChecked(): boolean {
        return this.qoliOptions.checked;
    }

    isDisabled(form: FormGroup): boolean {
        return !this.hasCountries(form) || !this.hasIndicators(form);
    }

    isEmpty(form: FormGroup): boolean {
        return this.hasCountries(form) && this.hasIndicators(form);
    }

    initForm(controls: {[key: string]: FormControl}): void {
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
    }

    save(form: FormGroup): void {
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

    reset(form: FormGroup): void {
        this.resetForm(form);

        this.selectedCountries = this.initSelectedCountries();
        this.selectedIndicators = this.initSelectedIndicators();
    }

    private hasCountries(form: FormGroup): boolean {
        return form.controls['countries'].value.length > 0;
    }

    private hasIndicators(form: FormGroup): boolean {
        if (form.controls[this.qoliOptions.filename].value) {
            return true;
        }

        for (const dimension of this.qoliOptions.aggregators) {
            const dimKey = dimension.filename;
            if (form.controls[dimKey].value) {
                return true;
            }

            for (const indicator of dimension.aggregators) {
                const indKey = `${dimKey}:${indicator.filename}`;
                if (form.controls[indKey].value) {
                    return true;
                }
            }
        }

        return false;
    }

    private initSelectedCountries(): string[] {
        return [...this.countries];
    }

    private initSelectedIndicators(): string[] {
        const selectedIndicators = [];

        for (const dimension of this.qoliOptions.aggregators) {
            const dimKey = dimension.filename;

            for (const indicator of dimension.aggregators) {
                const indKey = `${dimKey}:${indicator.filename}`;
                indicator.checked && selectedIndicators.push(indKey);
            }
        }

        return selectedIndicators;
    }

    private resetForm(form: FormGroup): void {
        const qoliKey = this.qoliOptions.filename;
        form.controls[qoliKey].setValue(this.qoliOptions.checked);

        for (const dimension of this.qoliOptions.aggregators) {
            const dimkey = dimension.filename;
            form.controls[dimkey].setValue(dimension.checked);

            const indicators = dimension.aggregators;
            for (const indicator of indicators) {
                const indicatorName = indicator.filename;
                form.controls[`${dimkey}:${indicatorName}`].setValue(indicator.checked);
            }
        }

        form.controls['countries'].setValue([...this.countries]);
        form.controls['year'].setValue(this.year);
    }
}
