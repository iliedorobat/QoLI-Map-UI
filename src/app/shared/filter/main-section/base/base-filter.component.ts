import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';

import {Filter} from '@/app/shared/filter';

import {
    ANALYSIS_TYPE,
    ANALYSIS_TYPE_LABELS,
    AVAILABLE_INTERVAL,
    EU28_MEMBER_CODES,
    EU28_MEMBERS
} from '@/app/shared/constants/app.const';

@Component({
    selector: 'qoli-atlas-base-filter',
    templateUrl: './base-filter.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule
    ]
})
export class BaseFilterComponent {
    constructor(
        protected filter: Filter
    ) {}

    @Input() isAoristicAnalysis: boolean = false;

    protected readonly ALL_COUNTRIES_NAME = 'ALL';
    protected readonly ANALYSIS_TYPE_LABELS = ANALYSIS_TYPE_LABELS;
    protected readonly ANALYSIS_TYPES = Object.values(ANALYSIS_TYPE);
    protected readonly AVAILABLE_INTERVAL = AVAILABLE_INTERVAL;
    protected readonly EU28_MEMBER_CODES = EU28_MEMBER_CODES;

    onCountryChanges(event: MatSelectChange): void {
        this.filter.baseFilter.selectedCountries = event.value.filter((code: string) => code !== this.ALL_COUNTRIES_NAME);
        this.filter.form.get('countries')?.setValue(this.filter.baseFilter.selectedCountries);
    }

    onEndYearChanges(event: MatSelectChange): void {
        this.filter.form.controls['startYear'].updateValueAndValidity();
    }

    onStartYearChanges(event: MatSelectChange): void {
        if (!this.isAoristicAnalysis) {
            this.filter.form.get('endYear')?.setValue(event.value);
        }
        this.filter.form.controls['endYear'].updateValueAndValidity();
    }

    isCountryChecked(countryCode: string): boolean {
        return this.filter.baseFilter.selectedCountries.includes(countryCode);
    }

    onAllCountriesChanges(checked: boolean): void {
        this.filter.baseFilter.selectedCountries = checked ? [...EU28_MEMBER_CODES] : [];
    }

    someCountriesChecked(): boolean {
        return this.filter.baseFilter.selectedCountries.length > 0 && this.filter.baseFilter.selectedCountries.length < EU28_MEMBER_CODES.length;
    }

    getCountryName(countryCode: any): string {
        return EU28_MEMBERS[countryCode as keyof typeof EU28_MEMBERS];
    }
}
