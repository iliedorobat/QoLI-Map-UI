import {FormControl, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

import {AtlasAnalysisTypeFilter, IAtlasAnalysisTypeFilter} from './atlas-filter-analysis-type-section/atlas-filter-analysis-type-section.types';
import {AtlasAggregatedFilter, IAtlasAggregatedFilter} from './atlas-filter-main-section/aggregated/atlas-filter-aggregated-section.component.types';

export interface IAtlasFilter {
    analysisTypeFilter: IAtlasAnalysisTypeFilter,
    aggregatedFilter: IAtlasAggregatedFilter;
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
        public analysisTypeFilter: AtlasAnalysisTypeFilter,
        public aggregatedFilter: AtlasAggregatedFilter
    ) {}

    isDisabled(): boolean {
        return this.analysisTypeFilter.isDisabled(this.form) || this.aggregatedFilter.isDisabled(this.form);
    }

    isEmpty(): boolean {
        return this.analysisTypeFilter.isEmpty(this.form) && this.aggregatedFilter.isEmpty(this.form);
    }

    reset(): void {
        this.analysisTypeFilter.reset(this.form);
        this.aggregatedFilter.reset(this.form);
    }

    save(): void {
        this.analysisTypeFilter.save(this.form);
        this.aggregatedFilter.save(this.form);
    }

    private initForm(): FormGroup {
        const controls: {[key: string]: FormControl} = {};
        this.analysisTypeFilter.initForm(controls);
        this.aggregatedFilter.initForm(controls);

        return new FormGroup(controls);
    }
}
