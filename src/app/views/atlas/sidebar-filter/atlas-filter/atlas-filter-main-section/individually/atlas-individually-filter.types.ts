import {FormControl, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

import {AtlasBaseFilter} from '../base/atlas-base-filter.types';
import {IQoLIOptionsIndicator} from '@/app/views/atlas/constants/qoliOptions.types';

export interface IAtlasIndividuallyFilter {
    selectedIndicator: IQoLIOptionsIndicator;
    unsavedIndicator: IQoLIOptionsIndicator;

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
    public selectedIndicator: IQoLIOptionsIndicator = this.initSelectedIndicator();
    public unsavedIndicator: IQoLIOptionsIndicator = this.initSelectedIndicator();

    constructor(public atlasBaseFilter: AtlasBaseFilter) {}


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
        this.unsavedIndicator = {...this.selectedIndicator} as IQoLIOptionsIndicator;
    }

    private hasIndicator(form: FormGroup): boolean {
        return !!form.controls['selectedIndicator'].value;
    }

    private initSelectedIndicator(): IQoLIOptionsIndicator {
        return this.atlasBaseFilter.qoliOptions?.aggregators[0]?.aggregators[0];
    }

    private resetForm(form: FormGroup): void {
        form.controls['selectedIndicator'].setValue(this.selectedIndicator);
    }
}
