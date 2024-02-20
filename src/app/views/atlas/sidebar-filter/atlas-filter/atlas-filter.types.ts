import {FormGroup} from '@angular/forms';

import {IAtlasBaseFilter} from './atlas-filter-main-section/atlas-filter-main-section.component.types';

export interface IAtlasFilter {
    baseFilter: IAtlasBaseFilter;
    isDisabled(): boolean;
    isEmpty(): boolean;
    reset(form: FormGroup, memoizedFilter: IAtlasFilter): void;
    resetFilter(memoizedFilter?: IAtlasFilter): void;
    resetFilterForm(form: FormGroup, memoizedFilter: IAtlasFilter): void;
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

    reset(form: FormGroup, memoizedFilter: IAtlasFilter): void {
        this.baseFilter.reset(form, memoizedFilter);
    }

    resetFilter(memoizedFilter?: IAtlasFilter): void {
        this.baseFilter.resetFilter(memoizedFilter);
    }

    resetFilterForm(form: FormGroup, memoizedFilter: IAtlasFilter): void {
        this.baseFilter.resetFilterForm(form, memoizedFilter);
    }
}
