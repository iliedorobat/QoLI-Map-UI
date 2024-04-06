import {FormControl, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

import {AtlasAggregatedFilter, IAtlasAggregatedFilter} from './atlas-filter-main-section/aggregated/atlas-aggregated-filter.types';
import {AtlasBaseFilter} from './atlas-filter-main-section/base/atlas-base-filter.types';
import {AtlasIndividuallyFilter, IAtlasIndividuallyFilter} from './atlas-filter-main-section/individually/atlas-individually-filter.types';

export interface IAtlasFilter {
    aggregatedFilter: IAtlasAggregatedFilter;
    individuallyFilter: IAtlasIndividuallyFilter;
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
        public aggregatedFilter: AtlasAggregatedFilter,
        public baseFilter: AtlasBaseFilter,
        public individuallyFilter: AtlasIndividuallyFilter
    ) {}

    isDisabled(): boolean {
        return this.aggregatedFilter.isDisabled(this.form)
            || this.baseFilter.isDisabled(this.form)
            || this.individuallyFilter.isDisabled(this.form);
    }

    isEmpty(): boolean {
        return this.aggregatedFilter.isEmpty(this.form)
            && this.baseFilter.isEmpty(this.form)
            && this.individuallyFilter.isEmpty(this.form);
    }

    reset(): void {
        this.aggregatedFilter.reset(this.form);
        this.baseFilter.reset(this.form);
        this.individuallyFilter.reset(this.form);
    }

    save(): void {
        this.aggregatedFilter.save(this.form);
        this.baseFilter.save(this.form);
        this.individuallyFilter.save(this.form);
    }

    private initForm(): FormGroup {
        const controls: {[key: string]: FormControl} = {};
        this.aggregatedFilter.initForm(controls);
        this.baseFilter.initForm(controls);
        this.individuallyFilter.initForm(controls);

        return new FormGroup(controls);
    }
}
