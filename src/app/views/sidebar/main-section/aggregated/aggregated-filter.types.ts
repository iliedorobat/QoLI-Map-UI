import {FormControl, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

import qoliOptions from '@/app/views/atlas/constants/qoliOptions';

export interface IAggregatedFilter {
    selectedIndicators: string[];

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
export class AggregatedFilter implements IAggregatedFilter {
    public selectedIndicators: string[] = this.initSelectedIndicators();

    areAllDimensionsChecked(): boolean {
        return qoliOptions.checked;
    }

    isDisabled(form: FormGroup): boolean {
        return !this.hasIndicators(form);
    }

    isEmpty(form: FormGroup): boolean {
        return this.hasIndicators(form);
    }

    initForm(controls: {[key: string]: FormControl}): void {
        const qoliKey = qoliOptions.filename;
        controls[qoliKey] = new FormControl(qoliOptions.checked);

        for (const dimension of qoliOptions.aggregators) {
            const dimKey = dimension.filename;
            controls[dimKey] = new FormControl(dimension.checked);

            for (const indicator of dimension.aggregators) {
                const indKey = indicator.filename;
                controls[indKey] = new FormControl(indicator.checked);
            }
        }
    }

    save(form: FormGroup): void {
        qoliOptions.checked = qoliOptions.aggregators.every(aggr => form.value[aggr.filename]);

        for (const dimension of qoliOptions.aggregators) {
            const dimKey = dimension.filename;
            dimension.checked = form.value[dimKey];

            for (const indicator of dimension.aggregators) {
                const indKey = indicator.filename;
                indicator.checked = form.value[indKey];
            }
        }
    }

    reset(form: FormGroup): void {
        this.resetForm(form);
        this.selectedIndicators = this.initSelectedIndicators();
    }

    private hasIndicators(form: FormGroup): boolean {
        if (form.controls[qoliOptions.filename].value) {
            return true;
        }

        for (const dimension of qoliOptions.aggregators) {
            const dimKey = dimension.filename;
            if (form.controls[dimKey].value) {
                return true;
            }

            for (const indicator of dimension.aggregators) {
                const indKey = indicator.filename;
                if (form.controls[indKey].value) {
                    return true;
                }
            }
        }

        return false;
    }

    private initSelectedIndicators(): string[] {
        const selectedIndicators = [];

        for (const dimension of qoliOptions.aggregators) {
            for (const indicator of dimension.aggregators) {
                const indKey = indicator.filename;
                indicator.checked && selectedIndicators.push(indKey);
            }
        }

        return selectedIndicators;
    }

    private resetForm(form: FormGroup): void {
        const qoliKey = qoliOptions.filename;
        form.controls[qoliKey].setValue(qoliOptions.checked);

        for (const dimension of qoliOptions.aggregators) {
            const dimkey = dimension.filename;
            form.controls[dimkey].setValue(dimension.checked);

            const indicators = dimension.aggregators;
            for (const indicator of indicators) {
                const indKey = indicator.filename;
                form.controls[indKey].setValue(indicator.checked);
            }
        }
    }
}
