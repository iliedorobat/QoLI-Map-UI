import {FormControl, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

import {ANALYSIS_TYPE, DEFAULT_ANALYSIS_TYPE} from '@/app/shared/constants/app.const';

export interface IAtlasAnalysisTypeFilter {
    analysisType: ANALYSIS_TYPE;

    isDisabled(form: FormGroup): boolean;
    initForm(controls: {[key: string]: FormControl}): void;
    isEmpty(form: FormGroup): boolean;
    reset(form: FormGroup): void;
    save(form: FormGroup): void;
}

@Injectable({
    providedIn: 'root',
})
export class AtlasAnalysisTypeFilter implements IAtlasAnalysisTypeFilter {
    public analysisType: ANALYSIS_TYPE = DEFAULT_ANALYSIS_TYPE;

    isDisabled(form: FormGroup): boolean {
        return !this.hasAnalysisType(form);
    }

    isEmpty(form: FormGroup): boolean {
        return this.hasAnalysisType(form);
    }

    initForm(controls: {[key: string]: FormControl}): void {
        controls['analysisType'] = new FormControl(this.analysisType);
    }

    save(form: FormGroup): void {
        this.analysisType = form.value['analysisType'];
    }

    reset(form: FormGroup): void {
        this.resetForm(form);
    }

    private resetForm(form: FormGroup): void {
        form.controls['analysisType'].setValue(this.analysisType);
    }

    private hasAnalysisType(form: FormGroup): boolean {
        return !!form.controls['analysisType'].value;
    }
}
