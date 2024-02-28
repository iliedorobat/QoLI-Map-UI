import {FormGroup} from '@angular/forms';

import {IAtlasBaseFilter} from './atlas-filter-main-section/atlas-filter-main-section.component.types';

export interface IAtlasFilter {
    baseFilter: IAtlasBaseFilter;
    isDisabled(): boolean;
    isEmpty(): boolean;
    resetFilterForm(form: FormGroup, filter: IAtlasFilter): void;
}

export class AtlasFilter implements IAtlasFilter {
    public baseFilter: IAtlasBaseFilter;

    constructor(baseFilter: IAtlasBaseFilter) {
        this.baseFilter = baseFilter;
    }

    isDisabled(): boolean {
        return this.baseFilter.isDisabled();
    }

    isEmpty(): boolean {
        return this.baseFilter.isEmpty();
    }

    resetFilterForm(form: FormGroup, filter: IAtlasFilter): void {
        this.baseFilter.resetFilterForm(form, filter);
    }
}
