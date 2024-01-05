import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {AtlasFilterService} from '../atlas-filter.service';
import {AtlasFilter} from '../atlas-filter.types';

import {LIFE_INDEX_END, LIFE_INDEX_LABELS, LIFE_INDEX_START} from '@/app/shared/constants/app.const';

@Component({
  selector: 'app-atlas-filter-main-section',
  templateUrl: './atlas-filter-main-section.component.html'
})
export class AtlasFilterMainSectionComponent {
    constructor(
        private atlasFilterService: AtlasFilterService
    ) {}

    protected readonly LIFE_INDEX_LABELS = Object.values(LIFE_INDEX_LABELS);
    protected readonly LIFE_INDEX_INTERVAL = getLifeIndexInterval(LIFE_INDEX_START, LIFE_INDEX_END);

    protected filter: AtlasFilter = this.atlasFilterService.getFilter();
    @Input() form: FormGroup = this.atlasFilterService.initFilterForm(this.filter);

    get category() {
        return this.form?.get('category');
    }

    get year() {
        return this.form?.get('year');
    }

    onCategoryLabelChanges(event: Event) {
        const category = this.atlasFilterService.getCategory(this.filter.categoryLabel);
        this.filter.category = category;
        this.form?.controls['category'].setValue(category);
    }
}

function getLifeIndexInterval(start: number, end: number) {
    const values = [];

    for (let year = start; year <= end; year++) {
        values.push(year);
    }

    return values;
};
