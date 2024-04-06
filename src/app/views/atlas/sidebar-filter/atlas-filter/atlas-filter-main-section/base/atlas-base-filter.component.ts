import {Component} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';

import {AtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';

import {
    ANALYSIS_TYPE,
    ANALYSIS_TYPE_LABELS,
    AVAILABLE_INTERVAL,
    EU28_MEMBER_CODES,
    EU28_MEMBERS
} from '@/app/shared/constants/app.const';

@Component({
    selector: 'app-atlas-base-filter',
    templateUrl: './atlas-base-filter.component.html',
    styleUrls: ['./atlas-base-filter.component.scss'],
    standalone: true,
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule
    ]
})
export class AtlasBaseFilterComponent {
    constructor(
        protected atlasFilter: AtlasFilter
    ) {}

    protected readonly ALL_COUNTRIES_NAME = 'ALL';
    protected readonly ANALYSIS_TYPE_LABELS = ANALYSIS_TYPE_LABELS;
    protected readonly ANALYSIS_TYPES = Object.values(ANALYSIS_TYPE);
    protected readonly AVAILABLE_INTERVAL = AVAILABLE_INTERVAL;
    protected readonly EU28_MEMBER_CODES = EU28_MEMBER_CODES;

    onCountryChanges(event: MatSelectChange): void {
        this.atlasFilter.baseFilter.selectedCountries = event.value.filter((code: string) => code !== this.ALL_COUNTRIES_NAME);
        this.atlasFilter.form.get('countries')?.setValue(this.atlasFilter.baseFilter.selectedCountries);
    }

    isCountryChecked(countryCode: string): boolean {
        return this.atlasFilter.baseFilter.selectedCountries.includes(countryCode);
    }

    onAllCountriesChanges(checked: boolean): void {
        this.atlasFilter.baseFilter.selectedCountries = checked ? [...EU28_MEMBER_CODES] : [];
    }

    someCountriesChecked(): boolean {
        return this.atlasFilter.baseFilter.selectedCountries.length > 0 && this.atlasFilter.baseFilter.selectedCountries.length < EU28_MEMBER_CODES.length;
    }

    getCountryName(countryCode: any): string {
        return EU28_MEMBERS[countryCode as keyof typeof EU28_MEMBERS];
    }
}
