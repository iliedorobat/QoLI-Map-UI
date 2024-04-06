import {Component} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import {AtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';
import {IQoLIOptionsIndicator} from '@/app/views/atlas/constants/qoliOptions.types';

@Component({
    selector: 'app-atlas-aggregated-filter',
    templateUrl: './atlas-aggregated-filter.component.html',
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
export class AtlasAggregatedFilterComponent {
    constructor(
        protected atlasFilter: AtlasFilter
    ) {}

    // Get the list of dimension keys
    private getDimensionKeys(): string[] {
        return this.atlasFilter.baseFilter.qoliOptions.aggregators.map(aggr => aggr.filename);
    }

    // Get the list of indicator keys which belongs to a specific dimension
    private getIndicatorKeys(dimKey: string | null | undefined, filterPredicate = (item: IQoLIOptionsIndicator) => true): string[] {
        if (!dimKey) {
            return [];
        }

        return this.atlasFilter.baseFilter.qoliOptions.aggregators
            .find(aggr => aggr.filename === dimKey)?.aggregators
            .filter(filterPredicate)
            .map(aggr => aggr.filename) || [];
    }

    // Return "false" if one of the dimension indicators is false
    private isDimensionChecked(dimKey: string): boolean {
        const indKeys = this.getIndicatorKeys(dimKey);

        for (const indKey of indKeys) {
            if (!this.atlasFilter.form.value[indKey]) {
                return false;
            }
        }

        return true
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

    someDimensionsChecked(): boolean {
        const dimKeys = this.getDimensionKeys();

        const checked = dimKeys.every(dimKey => {
            const indKeys = this.getIndicatorKeys(dimKey);
            return indKeys.every(key => this.atlasFilter.form.value[key]);
        });
        const unchecked = dimKeys.every(dimKey => {
            const indKeys = this.getIndicatorKeys(dimKey);
            return indKeys.every(key => !this.atlasFilter.form.value[key]);
        });

        if (checked || unchecked) {
            return false;
        }

        return dimKeys.some(key => !this.atlasFilter.form.value[key]);
    }

    someIndicatorsChecked(dimKey: string): boolean {
        const indKeys = this.getIndicatorKeys(dimKey);
        const checked = indKeys.every(key => this.atlasFilter.form.value[key]);
        const unchecked = indKeys.every(key => !this.atlasFilter.form.value[key]);

        if (checked || unchecked) {
            return false;
        }

        return indKeys.some(key => !this.atlasFilter.form.value[key]);
    }
}
