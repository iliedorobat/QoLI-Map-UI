import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {AtlasFilterService} from '../atlas-filter.service';
import {AtlasFilter} from '../atlas-filter.types';

import {
    LIFE_INDEX_CATEGORIES,
    LIFE_INDEX_INTERVAL,
    LIFE_INDEX_LABELS
} from '@/app/shared/constants/app.const';

@Component({
    selector: 'app-atlas-filter-main-section',
    templateUrl: './atlas-filter-main-section.component.html'
})
export class AtlasFilterMainSectionComponent {
    constructor(
        private atlasFilterService: AtlasFilterService
    ) {}

    protected readonly LIFE_INDEX_LABELS = Object.values(LIFE_INDEX_LABELS);
    protected readonly LIFE_INDEX_INTERVAL = LIFE_INDEX_INTERVAL;

    protected filter: AtlasFilter = this.atlasFilterService.getFilter();
    @Input() form: FormGroup = this.atlasFilterService.getInitFilterForm(this.filter);

    get category() {
        return this.form?.get('category');
    }

    get year() {
        return this.form?.get('year');
    }

    onCategoryLabelChanges(event: Event): void {
        const target = event.target as HTMLSelectElement;
        // Exclude the first option whose value is null
        const selectedIndex = target.selectedIndex - 1;
        this.filter.category = Object.values(LIFE_INDEX_CATEGORIES)[selectedIndex] as LIFE_INDEX_CATEGORIES;
    }

    onYearChanges(event: Event): void {
        const target = event.target as HTMLSelectElement;
        // Exclude the first option whose value is null
        const selectedIndex = target.selectedIndex - 1;
        this.filter.year = this.LIFE_INDEX_INTERVAL[selectedIndex];
    }
}
