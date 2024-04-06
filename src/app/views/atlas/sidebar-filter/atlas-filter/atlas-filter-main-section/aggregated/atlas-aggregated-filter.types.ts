import {FormControl, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

import qoliConfig from '@/app/views/atlas/constants/qoliOptions';

export interface IAtlasAggregatedFilter {
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
export class AtlasAggregatedFilter implements IAtlasAggregatedFilter {
    public selectedIndicators: string[] = this.initSelectedIndicators();

    areAllDimensionsChecked(): boolean {
        return qoliConfig.checked;
    }

    isDisabled(form: FormGroup): boolean {
        return !this.hasIndicators(form);
    }

    isEmpty(form: FormGroup): boolean {
        return this.hasIndicators(form);
    }

    initForm(controls: {[key: string]: FormControl}): void {
        const qoliKey = qoliConfig.filename;
        controls[qoliKey] = new FormControl(qoliConfig.checked);

        for (const dimension of qoliConfig.aggregators) {
            const dimKey = dimension.filename;
            controls[dimKey] = new FormControl(dimension.checked);

            for (const indicator of dimension.aggregators) {
                const indKey = indicator.filename;
                controls[indKey] = new FormControl(indicator.checked);
            }
        }
    }

    save(form: FormGroup): void {
        qoliConfig.checked = qoliConfig.aggregators.every(aggr => form.value[aggr.filename]);

        for (const dimension of qoliConfig.aggregators) {
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
        if (form.controls[qoliConfig.filename].value) {
            return true;
        }

        for (const dimension of qoliConfig.aggregators) {
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

        for (const dimension of qoliConfig.aggregators) {
            for (const indicator of dimension.aggregators) {
                const indKey = indicator.filename;
                indicator.checked && selectedIndicators.push(indKey);
            }
        }

        return selectedIndicators;
    }

    private resetForm(form: FormGroup): void {
        const qoliKey = qoliConfig.filename;
        form.controls[qoliKey].setValue(qoliConfig.checked);

        for (const dimension of qoliConfig.aggregators) {
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
