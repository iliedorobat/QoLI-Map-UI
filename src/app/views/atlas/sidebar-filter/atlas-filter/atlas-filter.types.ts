import {FormGroup} from '@angular/forms';

import {IAtlasBaseFilter} from './atlas-filter-main-section/atlas-filter-main-section.component.types';
import {IQoLI} from '@/app/views/atlas/constants/qoli.types';

export interface IAtlasFilter {
    baseFilter: IAtlasBaseFilter;
    isDisabled(): boolean;
    isEmpty(): boolean;
    reset(form: FormGroup, qoliOptions: IQoLI): void;
    resetFilter(qoliOptions?: IQoLI): void;
    resetFilterForm(form: FormGroup, qoliOptions: IQoLI): void;
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

    reset(form: FormGroup, qoliOptions: IQoLI): void {
        this.baseFilter.reset(form, qoliOptions);
    }

    resetFilter(qoliOptions?: IQoLI): void {
        this.baseFilter.resetFilter(qoliOptions);
    }

    resetFilterForm(form: FormGroup, qoliOptions: IQoLI): void {
        this.baseFilter.resetFilterForm(form, qoliOptions);
    }
}
