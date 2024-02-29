import {FormGroup} from '@angular/forms';

import {IAtlasBaseFilter} from './atlas-filter-main-section/atlas-filter-main-section.component.types';

export interface IAtlasFilter {
    baseFilter: IAtlasBaseFilter;
    isDisabled(form: FormGroup): boolean;
    isEmpty(form: FormGroup): boolean;
    initForm(): FormGroup;
    resetForm(form: FormGroup): void;
    saveFilter(form: FormGroup): void;
}

export class AtlasFilter implements IAtlasFilter {
    public baseFilter: IAtlasBaseFilter;

    constructor(baseFilter: IAtlasBaseFilter) {
        this.baseFilter = baseFilter;
    }

    isDisabled(form: FormGroup): boolean {
        return this.baseFilter.isDisabled(form);
    }

    isEmpty(form: FormGroup): boolean {
        return this.baseFilter.isEmpty(form);
    }

    initForm(): FormGroup {
        return this.baseFilter.initForm();
    }

    resetForm(form: FormGroup): void {
        this.baseFilter.resetForm(form);
    }

    saveFilter(form: FormGroup): void {
        this.baseFilter.saveFilter(form);
    }
}
