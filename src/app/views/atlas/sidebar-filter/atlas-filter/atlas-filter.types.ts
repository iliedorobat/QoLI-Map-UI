import {FormControl, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

import {AtlasBaseFilter, IAtlasBaseFilter} from './atlas-filter-main-section/atlas-filter-main-section.component.types';

export interface IAtlasFilter {
    baseFilter: IAtlasBaseFilter;
    form: FormGroup;

    isDisabled(): boolean;
    isEmpty(): boolean;
    reset(): void;
    save(): void;
}

@Injectable({
    providedIn: 'root',
})
export class AtlasFilter implements IAtlasFilter {
    public form: FormGroup = this.initForm();

    constructor(
        public baseFilter: AtlasBaseFilter
    ) {}

    isDisabled(): boolean {
        return this.baseFilter.isDisabled(this.form);
    }

    isEmpty(): boolean {
        return this.baseFilter.isEmpty(this.form);
    }

    reset(): void {
        this.baseFilter.reset(this.form);
    }

    save(): void {
        this.baseFilter.save(this.form);
    }

    private initForm(): FormGroup {
        const controls: {[key: string]: FormControl} = {};
        this.baseFilter.initForm(controls);

        return new FormGroup(controls);
    }
}
