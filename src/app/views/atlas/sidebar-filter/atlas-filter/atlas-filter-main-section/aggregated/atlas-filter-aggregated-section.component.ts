import {Component} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';

import {AtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';
import {IQoLIOptionsIndicator} from '@/app/views/atlas/constants/qoliOptions.types';

import {AVAILABLE_INTERVAL, EU28_MEMBER_CODES, EU28_MEMBERS} from '@/app/shared/constants/app.const';

@Component({
    selector: 'app-atlas-filter-aggregated-section',
    templateUrl: './atlas-filter-aggregated-section.component.html',
    styleUrls: ['./atlas-filter-aggregated-section.component.scss'],
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
export class AtlasFilterAggregatedSectionComponent {
    constructor(
        protected atlasFilter: AtlasFilter
    ) {}

    protected readonly ALL_COUNTRIES_NAME = 'ALL';
    protected readonly AVAILABLE_INTERVAL = AVAILABLE_INTERVAL;
    protected readonly EU28_MEMBER_CODES = EU28_MEMBER_CODES;

    // Get the list of dimension keys
    private getDimensionKeys(): string[] {
        return this.atlasFilter.aggregatedFilter.qoliOptions.aggregators.map(aggr => aggr.filename);
    }

    // Get the list of indicator keys which belongs to a specific dimension
    private getIndicatorKeys(dimKey: string | null | undefined, filterPredicate = (item: IQoLIOptionsIndicator) => true): string[] {
        if (!dimKey) {
            return [];
        }

        return this.atlasFilter.aggregatedFilter.qoliOptions.aggregators
            .find(aggr => aggr.filename === dimKey)?.aggregators
            .filter(filterPredicate)
            .map(aggr => `${dimKey}:${aggr.filename}`) || [];
    }

    // Return "false" if one of the dimension indicators is false
    private isDimensionChecked(dimKey: string): boolean {
        const indKeys = this.getIndicatorKeys(dimKey);

        for (const indKey of indKeys) {
            if (!this.atlasFilter.form.get(indKey)?.value) {
                return false;
            }
        }

        return true
    }

    onCountryChanges(event: MatSelectChange): void {
        this.atlasFilter.aggregatedFilter.selectedCountries = event.value.filter((code: string) => code !== this.ALL_COUNTRIES_NAME);
        this.atlasFilter.form.get('countries')?.setValue(this.atlasFilter.aggregatedFilter.selectedCountries);
    }

    isCountryChecked(countryCode: string): boolean {
        return this.atlasFilter.aggregatedFilter.selectedCountries.includes(countryCode);
    }

    onAllCountriesChanges(checked: boolean): void {
        this.atlasFilter.aggregatedFilter.selectedCountries = checked ? [...EU28_MEMBER_CODES] : [];
    }

    onAllDimensionsChanges(qoliKey: string | null, checked: boolean): void {
        const dimKeys = this.getDimensionKeys();

        for (const dimKey of dimKeys) {
            this.atlasFilter.form.get(dimKey)?.setValue(checked);
            this.onDimensionChanges(dimKey, checked);
        }
    }

    onDimensionChanges(dimKey: string | null, checked: boolean): void {
        const indKeys = this.getIndicatorKeys(dimKey);

        for (const indKey of indKeys) {
            this.atlasFilter.form.get(indKey)?.setValue(checked);
        }
    };

    onIndicatorChanges(event: MatCheckboxChange): void {
        const [dimKey, indKey] = (event.source.name || '')?.split(':');

        const isDimensionChecked = this.isDimensionChecked(dimKey);
        this.atlasFilter.form.get(dimKey)?.setValue(isDimensionChecked);
    }

    onFeatureChanges(): void {
        const selectedIndicators = [];
        const dimKeys = this.getDimensionKeys();

        for (const dimKey of dimKeys) {
            const indKeys = this.getIndicatorKeys(dimKey);

            for (const indKey of indKeys) {
                const isSelected = this.atlasFilter.form.get(indKey)?.value;
                isSelected && selectedIndicators.push(indKey);
            }
        }

        this.atlasFilter.aggregatedFilter.selectedIndicators = selectedIndicators;
    }

    someCountriesChecked(): boolean {
        return this.atlasFilter.aggregatedFilter.selectedCountries.length > 0 && this.atlasFilter.aggregatedFilter.selectedCountries.length < EU28_MEMBER_CODES.length;
    }

    someDimensionsChecked(): boolean {
        const dimKeys = this.getDimensionKeys();

        const checked = dimKeys.every(dimKey => {
            const indKeys = this.getIndicatorKeys(dimKey);
            return indKeys.every(key => this.atlasFilter.form.get(key)?.value);
        });
        const unchecked = dimKeys.every(dimKey => {
            const indKeys = this.getIndicatorKeys(dimKey);
            return indKeys.every(key => !this.atlasFilter.form.get(key)?.value);
        });

        if (checked || unchecked) {
            return false;
        }

        return dimKeys.some(key => !this.atlasFilter.form.get(key)?.value);
    }

    someIndicatorsChecked(dimKey: string): boolean {
        const indKeys = this.getIndicatorKeys(dimKey);
        const checked = indKeys.every(key => this.atlasFilter.form.get(key)?.value);
        const unchecked = indKeys.every(key => !this.atlasFilter.form.get(key)?.value);

        if (checked || unchecked) {
            return false;
        }

        return indKeys.some(key => !this.atlasFilter.form.get(key)?.value);
    }

    getCountryName(countryCode: any): string {
        return EU28_MEMBERS[countryCode as keyof typeof EU28_MEMBERS];
    }
}
