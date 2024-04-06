import {FormControl, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

import {AtlasAnalysisTypeFilter, IAtlasAnalysisTypeFilter} from './atlas-filter-analysis-type-section/atlas-filter-analysis-type-section.types';
import {AtlasBaseFilter, IAtlasBaseFilter} from './atlas-filter-main-section/atlas-filter-main-section.component.types';

export interface IAtlasFilter {
    analysisTypeFilter: IAtlasAnalysisTypeFilter,
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
        public analysisTypeFilter: AtlasAnalysisTypeFilter,
        public baseFilter: AtlasBaseFilter
    ) {}

    isDisabled(): boolean {
        return this.analysisTypeFilter.isDisabled(this.form) || this.baseFilter.isDisabled(this.form);
    }

    isEmpty(): boolean {
        return this.analysisTypeFilter.isEmpty(this.form) && this.baseFilter.isEmpty(this.form);
    }

    reset(): void {
        this.analysisTypeFilter.reset(this.form);
        this.baseFilter.reset(this.form);
    }

    save(): void {
        this.analysisTypeFilter.save(this.form);
        this.baseFilter.save(this.form);
    }

    private initForm(): FormGroup {
        const controls: {[key: string]: FormControl} = {};
        this.analysisTypeFilter.initForm(controls);
        this.baseFilter.initForm(controls);

        return new FormGroup(controls);
    }
}
