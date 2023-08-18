import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {AtlasFilterService} from '../atlas-filter.service';
import {AtlasFilterType} from '../atlas-filter.types';

import {LIFE_INDEX_CATEGORIES, LIFE_INDEX_YEARS} from '../atlas-filter.enums';

@Component({
  selector: 'app-atlas-filter-main-section',
  templateUrl: './atlas-filter-main-section.component.html'
})
export class AtlasFilterMainSectionComponent {
    constructor(
        private atlasFilterService: AtlasFilterService
    ) {}

    filter: AtlasFilterType = this.atlasFilterService.getFilter();
    @Input() form: FormGroup = this.atlasFilterService.initFilterForm(this.filter);

    LIFE_INDEX_CATEGORIES = Object.values(LIFE_INDEX_CATEGORIES);
    LIFE_INDEX_YEARS = Object.values(LIFE_INDEX_YEARS);

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
