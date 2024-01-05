import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {AtlasFilterService} from '../atlas-filter.service';
import {AtlasFilter} from '../atlas-filter.types';

import {AVAILABLE_INTERVAL, LIFE_INDEX_LABELS} from '@/app/shared/constants/app.const';

@Component({
    selector: 'app-atlas-filter-main-section',
    templateUrl: './atlas-filter-main-section.component.html'
})
export class AtlasFilterMainSectionComponent {
    constructor(
        private atlasFilterService: AtlasFilterService
    ) {}

    protected readonly LIFE_INDEX_LABELS = Object.values(LIFE_INDEX_LABELS);
    protected readonly AVAILABLE_INTERVAL = AVAILABLE_INTERVAL;

    protected filter: AtlasFilter = this.atlasFilterService.getTransitoryFilter();
    @Input() form: FormGroup = this.atlasFilterService.getNewFilterForm(this.filter);

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
        this.filter.primary.onCategoryChanges(selectedIndex);
    }

    onYearChanges(event: Event): void {
        const target = event.target as HTMLSelectElement;
        // Exclude the first option whose value is null
        const selectedIndex = target.selectedIndex - 1;
        this.filter.primary.onYearChanges(selectedIndex);
    }
}
