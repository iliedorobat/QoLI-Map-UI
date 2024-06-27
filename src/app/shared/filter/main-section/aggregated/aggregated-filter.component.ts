import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import {IAggrQoLIIndicator} from '@/app/views/atlas/constants/qoliOptions.types';
import {Filter} from '@/app/shared/filter';

@Component({
    selector: 'qoli-aggregated-filter',
    templateUrl: './aggregated-filter.component.html',
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
export class AggregatedFilterComponent {
    constructor(
        protected filter: Filter
    ) {}

    // Get the list of dimension keys
    private getDimensionKeys(): string[] {
        return this.filter.baseFilter.qoliOptions.aggregators.map(aggr => aggr.filename);
    }

    // Get the list of indicator keys which belongs to a specific dimension
    private getIndicatorKeys(dimKey: string | null | undefined, filterPredicate = (item: IAggrQoLIIndicator) => true): string[] {
        if (!dimKey) {
            return [];
        }

        return this.filter.baseFilter.qoliOptions.aggregators
            .find(aggr => aggr.filename === dimKey)?.aggregators
            .filter(filterPredicate)
            .map(aggr => aggr.filename) || [];
    }

    // Return "false" if one of the dimension indicators is false
    private isDimensionChecked(dimKey: string): boolean {
        const indKeys = this.getIndicatorKeys(dimKey);

        for (const indKey of indKeys) {
            if (!this.filter.form.value[indKey]) {
                return false;
            }
        }

        return true
    }

    onAllDimensionsChanges(qoliKey: string | null, checked: boolean): void {
        const dimKeys = this.getDimensionKeys();

        for (const dimKey of dimKeys) {
            this.filter.form.get(dimKey)?.setValue(checked);
            this.onDimensionChanges(dimKey, checked);
        }
    }

    onDimensionChanges(dimKey: string | null, checked: boolean): void {
        const indKeys = this.getIndicatorKeys(dimKey);

        for (const indKey of indKeys) {
            this.filter.form.get(indKey)?.setValue(checked);
        }
    };

    onIndicatorChanges(event: MatCheckboxChange): void {
        const [dimKey, indKey] = (event.source.name || '')?.split(':');

        const isDimensionChecked = this.isDimensionChecked(dimKey);
        this.filter.form.get(dimKey)?.setValue(isDimensionChecked);
    }

    onFeatureChanges(): void {
        const selectedIndicators = [];
        const dimKeys = this.getDimensionKeys();

        for (const dimKey of dimKeys) {
            const indKeys = this.getIndicatorKeys(dimKey);

            for (const indKey of indKeys) {
                const isSelected = this.filter.form.get(indKey)?.value;
                isSelected && selectedIndicators.push(indKey);
            }
        }

        this.filter.aggregatedFilter.selectedIndicators = selectedIndicators;
    }

    someDimensionsChecked(): boolean {
        const dimKeys = this.getDimensionKeys();

        const checked = dimKeys.every(dimKey => {
            const indKeys = this.getIndicatorKeys(dimKey);
            return indKeys.every(key => this.filter.form.value[key]);
        });
        const unchecked = dimKeys.every(dimKey => {
            const indKeys = this.getIndicatorKeys(dimKey);
            return indKeys.every(key => !this.filter.form.value[key]);
        });

        if (checked || unchecked) {
            return false;
        }

        return dimKeys.some(key => !this.filter.form.value[key]);
    }

    someIndicatorsChecked(dimKey: string): boolean {
        const indKeys = this.getIndicatorKeys(dimKey);
        const checked = indKeys.every(key => this.filter.form.value[key]);
        const unchecked = indKeys.every(key => !this.filter.form.value[key]);

        if (checked || unchecked) {
            return false;
        }

        return indKeys.some(key => !this.filter.form.value[key]);
    }
}
