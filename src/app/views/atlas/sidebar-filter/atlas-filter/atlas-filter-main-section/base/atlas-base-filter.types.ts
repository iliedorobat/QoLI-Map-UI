import {FormControl, FormGroup} from '@angular/forms';

import {IIndividuallyQoLI} from '@/app/views/atlas/constants/qoliBaseOptions.types';
import {IAggrQoLI} from '@/app/views/atlas/constants/qoliOptions.types';
import qoliOptions from '@/app/views/atlas/constants/qoliOptions';
import qoliBaseOptions from '@/app/views/atlas/constants/qoliBaseOptions';

import {ANALYSIS_TYPE, DEFAULT_ANALYSIS_TYPE, DEFAULT_YEAR, EU28_MEMBER_CODES} from '@/app/shared/constants/app.const';

export interface IAtlasBaseFilter {
    analysisType: ANALYSIS_TYPE;
    countries: string[];
    qoliOptions: IAggrQoLI;
    qoliIndividuallyOptions: IIndividuallyQoLI;
    selectedCountries: string[];
    year: number;

    areAllCountriesChecked(): boolean;
    initForm(controls: {[key: string]: FormControl}): void;
    isDisabled(form: FormGroup): boolean;
    isEmpty(form: FormGroup): boolean;
    isIndividuallyAnalysis(): boolean;
    reset(form: FormGroup): void;
    save(form: FormGroup): void;
}

export class AtlasBaseFilter implements IAtlasBaseFilter {
    public analysisType: ANALYSIS_TYPE = DEFAULT_ANALYSIS_TYPE;
    public countries: string[] = [...EU28_MEMBER_CODES];
    public qoliOptions: IAggrQoLI = qoliOptions;
    public qoliIndividuallyOptions: IIndividuallyQoLI = qoliBaseOptions;
    public year: number = DEFAULT_YEAR;

    public selectedCountries: string[] = this.initSelectedCountries();

    areAllCountriesChecked(): boolean {
        return this.selectedCountries.length === EU28_MEMBER_CODES.length;
    }

    isDisabled(form: FormGroup): boolean {
        return !this.hasAnalysisType(form) || !this.hasCountries(form);
    }

    isEmpty(form: FormGroup): boolean {
        return this.hasAnalysisType(form) && this.hasCountries(form);
    }

    isIndividuallyAnalysis(): boolean {
        return this.analysisType === ANALYSIS_TYPE.INDIVIDUALLY;
    }

    initForm(controls: {[key: string]: FormControl}): void {
        controls['analysisType'] = new FormControl(this.analysisType);
        controls['countries'] = new FormControl(this.countries);
        controls['year'] = new FormControl(this.year);
    }

    save(form: FormGroup): void {
        this.analysisType = form.value['analysisType'];
        this.countries = form.value['countries'];
        this.year = form.value['year'];
    }

    reset(form: FormGroup): void {
        this.resetForm(form);
        this.selectedCountries = this.initSelectedCountries();
    }

    private hasAnalysisType(form: FormGroup): boolean {
        return !!form.controls['analysisType'].value;
    }

    private hasCountries(form: FormGroup): boolean {
        return form.controls['countries'].value.length > 0;
    }

    private initSelectedCountries(): string[] {
        return [...this.countries];
    }

    private resetForm(form: FormGroup): void {
        form.controls['analysisType'].setValue(this.analysisType);
        form.controls['countries'].setValue([...this.countries]);
        form.controls['year'].setValue(this.year);
    }
}
