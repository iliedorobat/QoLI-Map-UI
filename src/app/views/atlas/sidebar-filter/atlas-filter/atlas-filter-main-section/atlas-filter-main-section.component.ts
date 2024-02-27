import {Component, Input, OnInit} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';

import {AtlasFilterService, EU28_MEMBER_CODES, EU28_MEMBERS} from '../atlas-filter.service';
import {IAtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';
import {IQoLIDimension, IQoLIIndicator} from '@/app/views/atlas/constants/qoli.types';

import {AVAILABLE_INTERVAL} from '@/app/shared/constants/app.const';

@Component({
    selector: 'app-atlas-filter-main-section',
    templateUrl: './atlas-filter-main-section.component.html',
    styleUrls: ['./app-atlas-filter-main-section.scss'],
    standalone: true,
    imports: [BrowserAnimationsModule, FormsModule, MatCheckboxModule, MatInputModule, MatSelectModule, ReactiveFormsModule]
})
export class AtlasFilterMainSectionComponent implements OnInit {
    constructor(
        private atlasFilterService: AtlasFilterService
    ) {}

    protected readonly AVAILABLE_INTERVAL = AVAILABLE_INTERVAL;
    protected readonly EU28_MEMBER_CODES = EU28_MEMBER_CODES;
    protected selectedCountries: string[] = [];
    protected selectedFeatures: string[] = [];

    @Input() filter: IAtlasFilter = this.atlasFilterService.getTransitoryFilter();
    @Input() form = this.atlasFilterService.initializeFilterForm(this.filter);

    ngOnInit(): void {
        this.selectedCountries = [...this.filter.baseFilter.countries];
        this.selectedFeatures = this.getSelectedFeatures();
    }

    onDimensionChanges(dimension: IQoLIDimension): void {
        const dimKey = dimension.filename;
        const value = this.form.get(dimKey)?.value;
        dimension.checked = value;

        for (const indicator of dimension.aggregators) {
            const indKey = `${dimKey}:${indicator.filename}`;
            this.form.get(indKey)?.setValue(value);
            indicator.checked = value;
        }

        const unchecked = this.filter.baseFilter.qoliOptions.aggregators.some(dim => !dim.checked);
        this.filter.baseFilter.qoliOptions.checked = !unchecked;

        this.updateSelectedFeatures();
    };

    onIndicatorChanges(dimension: IQoLIDimension, indicator: IQoLIIndicator): void {
        const dimKey = dimension.filename;
        const indKey = `${dimKey}:${indicator.filename}`;
        indicator.checked = this.form.get(indKey)?.value;

        const unchecked = dimension.aggregators.some(indicator => !indicator.checked);

        this.form.get(dimension.filename)?.setValue(!unchecked);
        dimension.checked = !unchecked;

        this.filter.baseFilter.qoliOptions.checked = !unchecked;

        this.updateSelectedFeatures();
    }

    onCountriesChanges(event: MatSelectChange): void {
        this.selectedCountries = [...event.value];
        this.filter.baseFilter.countries = [...event.value];
    }

    onFeaturesChanges(event: MatSelectChange): void {
        // Do nothing
    }

    onYearChanges(event: MatSelectChange): void {
        this.form.get('year')?.setValue(event.value);
    }

    someIndicatorsChecked(dimension: IQoLIDimension): boolean {
        const checked = dimension.aggregators.every(indicator => indicator.checked);
        const unchecked = dimension.aggregators.every(indicator => !indicator.checked);

        if (checked || unchecked) {
            return false;
        }

        return dimension.aggregators.some(indicator => indicator.checked);
    }

    getCountryName(countryCode: any): string {
        return EU28_MEMBERS[countryCode as keyof typeof EU28_MEMBERS];
    }

    getSelectedFeatures(): string[] {
        const dimensions = this.filter.baseFilter.qoliOptions.aggregators;

        return dimensions.reduce((acc, dimension) => {
            dimension.checked && acc.push(dimension.filename);
            const indicators = dimension.aggregators;

            for (const indicator of indicators) {
                indicator.checked && acc.push(indicator.filename);
            }

            return acc;
        }, [] as string[]);
    }

    updateSelectedFeatures(): void {
        this.selectedFeatures = this.getSelectedFeatures();
    }
}
