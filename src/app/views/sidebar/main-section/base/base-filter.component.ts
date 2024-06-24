import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';

import {SidebarFilter} from '@/app/views/sidebar';

import {
    ANALYSIS_TYPE,
    ANALYSIS_TYPE_LABELS,
    AVAILABLE_INTERVAL,
    EU28_MEMBER_CODES,
    EU28_MEMBERS
} from '@/app/shared/constants/app.const';

@Component({
    selector: 'app-atlas-base-filter',
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
        protected sidebarFilter: SidebarFilter
    ) {}

    protected readonly ALL_COUNTRIES_NAME = 'ALL';
    protected readonly ANALYSIS_TYPE_LABELS = ANALYSIS_TYPE_LABELS;
    protected readonly ANALYSIS_TYPES = Object.values(ANALYSIS_TYPE);
    protected readonly AVAILABLE_INTERVAL = AVAILABLE_INTERVAL;
    protected readonly EU28_MEMBER_CODES = EU28_MEMBER_CODES;

    onCountryChanges(event: MatSelectChange): void {
        this.sidebarFilter.baseFilter.selectedCountries = event.value.filter((code: string) => code !== this.ALL_COUNTRIES_NAME);
        this.sidebarFilter.form.get('countries')?.setValue(this.sidebarFilter.baseFilter.selectedCountries);
    }

    isCountryChecked(countryCode: string): boolean {
        return this.sidebarFilter.baseFilter.selectedCountries.includes(countryCode);
    }

    onAllCountriesChanges(checked: boolean): void {
        this.sidebarFilter.baseFilter.selectedCountries = checked ? [...EU28_MEMBER_CODES] : [];
    }

    someCountriesChecked(): boolean {
        return this.sidebarFilter.baseFilter.selectedCountries.length > 0 && this.sidebarFilter.baseFilter.selectedCountries.length < EU28_MEMBER_CODES.length;
    }

    getCountryName(countryCode: any): string {
        return EU28_MEMBERS[countryCode as keyof typeof EU28_MEMBERS];
    }
}
