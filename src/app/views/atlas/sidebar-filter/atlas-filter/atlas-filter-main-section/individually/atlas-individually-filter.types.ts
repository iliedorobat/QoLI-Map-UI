import {FormControl, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

import {AtlasBaseFilter} from '../base/atlas-base-filter.types';
import {IIndividuallyQoLIDimension, IIndividuallyQoLIIndicator} from '@/app/views/atlas/constants/qoliBaseOptions.types';

export interface IAtlasIndividuallyFilter {
    selectedIndicator: IIndividuallyQoLIIndicator;
    unsavedIndicator: IIndividuallyQoLIIndicator;

    initForm(controls: {[key: string]: FormControl}): void;
    isDisabled(form: FormGroup): boolean;
    isEmpty(form: FormGroup): boolean;
    reset(form: FormGroup): void;
    save(form: FormGroup): void;
}

@Injectable({
    providedIn: 'root',
})
export class AtlasIndividuallyFilter implements IAtlasIndividuallyFilter {
    public selectedIndicator: IIndividuallyQoLIIndicator = this.initSelectedIndicator();
    public unsavedIndicator: IIndividuallyQoLIIndicator = this.initSelectedIndicator();

    private indicators = this.atlasBaseFilter.qoliIndividuallyOptions.aggregators.reduce((acc: IIndividuallyQoLIIndicator[], dimension: IIndividuallyQoLIDimension) => {
        return [...acc, ...dimension.aggregators];
    }, []);

    constructor(public atlasBaseFilter: AtlasBaseFilter) {}

    getUnits(): string | undefined {
        const indicator = this.indicators.find(indicator => indicator.filename === this.selectedIndicator.filename);
        return indicator?.units
    }

    isNegativeState(): boolean {
        const indicator = this.indicators.find(indicator => indicator.filename === this.selectedIndicator.filename);
        return indicator?.negativeState || false;
    }

    isDisabled(form: FormGroup): boolean {
        return !this.hasIndicator(form);
    }

    isEmpty(form: FormGroup): boolean {
        return this.hasIndicator(form);
    }

    initForm(controls: { [key: string]: FormControl }): void {
        controls['selectedIndicator'] = new FormControl(this.selectedIndicator);
    }

    save(form: FormGroup): void {
        this.selectedIndicator = form.value['selectedIndicator'];
        this.unsavedIndicator = form.value['selectedIndicator'];
    }

    reset(form: FormGroup): void {
        this.resetForm(form);
        this.unsavedIndicator = {...this.selectedIndicator} as IIndividuallyQoLIIndicator;
    }

    private hasIndicator(form: FormGroup): boolean {
        return !!form.controls['selectedIndicator'].value;
    }

    private initSelectedIndicator(): IIndividuallyQoLIIndicator {
        return this.atlasBaseFilter.qoliIndividuallyOptions?.aggregators[0]?.aggregators[0];
    }

    private resetForm(form: FormGroup): void {
        form.controls['selectedIndicator'].setValue(this.selectedIndicator);
    }
}
