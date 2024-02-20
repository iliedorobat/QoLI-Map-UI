import {FormGroup} from '@angular/forms';

import {IPrimaryAtlasFilter} from './atlas-filter-main-section/atlas-filter-main-section.component.types';
import {IQoLI} from '@/app/views/atlas/constants/qoli.types';

export interface IAtlasFilterMethods {
    isDisabled(): boolean;
    isEmpty(): boolean;
    reset(form: FormGroup, qoliOptions: IQoLI): void;
    resetFilter(qoliOptions?: IQoLI): void;
    resetFilterForm(form: FormGroup, qoliOptions: IQoLI): void;
}

export interface IAtlasFilter extends IAtlasFilterMethods {
    primaryFilter: IPrimaryAtlasFilter;
}

export class AtlasFilter implements IAtlasFilter {
    public primaryFilter: IPrimaryAtlasFilter;

    constructor(primaryFilter: IPrimaryAtlasFilter) {
        this.primaryFilter = primaryFilter;
    }

    isDisabled(): boolean {
        return this.primaryFilter.isDisabled();
    }

    isEmpty(): boolean {
        return this.primaryFilter.isEmpty();
    }

    reset(form: FormGroup, qoliOptions: IQoLI): void {
        this.primaryFilter.reset(form, qoliOptions);
    }

    resetFilter(qoliOptions?: IQoLI): void {
        this.primaryFilter.resetFilter(qoliOptions);
    }

    resetFilterForm(form: FormGroup, qoliOptions: IQoLI): void {
        this.primaryFilter.resetFilterForm(form, qoliOptions);
    }
}
