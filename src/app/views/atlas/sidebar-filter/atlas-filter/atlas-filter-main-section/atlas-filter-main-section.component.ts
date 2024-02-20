import {Component, Input} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';

import {AtlasFilterService} from '../atlas-filter.service';
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
export class AtlasFilterMainSectionComponent {
    constructor(
        private atlasFilterService: AtlasFilterService
    ) {}

    protected readonly AVAILABLE_INTERVAL = AVAILABLE_INTERVAL;

    @Input() filter: IAtlasFilter = this.atlasFilterService.getTransitoryFilter();
    @Input() form = this.atlasFilterService.initializeFilterForm(this.filter);

    onDimensionChanges(dimension: IQoLIDimension): void {
        const dimKey = dimension.filename;
        const value = this.form.get(dimKey)?.value;

        for (const indicator of dimension.aggregators) {
            const indKey = `${dimKey}:${indicator.filename}`;
            this.form.get(indKey)?.setValue(value);
            indicator.checked = value;
        }
    };

    onIndicatorChanges(dimension: IQoLIDimension, indicator: IQoLIIndicator): void {
        const dimKey = dimension.filename;
        const indKey = `${dimKey}:${indicator.filename}`;
        indicator.checked = this.form.get(indKey)?.value;

        const unchecked = dimension.aggregators.every(indicator => !indicator.checked);

        if (unchecked) {
            this.form.get(dimension.filename)?.setValue(false);
        }
    }

    someChecked(dimension: IQoLIDimension): boolean {
        const checked = dimension.aggregators.every(indicator => indicator.checked);
        const unchecked = dimension.aggregators.every(indicator => !indicator.checked);

        if (checked || unchecked) {
            return false;
        }

        return dimension.aggregators.some(indicator => indicator.checked);
    }

    onYearChanges(event: MatSelectChange): void {
        this.form.get('year')?.setValue(event.value);
    }
}
