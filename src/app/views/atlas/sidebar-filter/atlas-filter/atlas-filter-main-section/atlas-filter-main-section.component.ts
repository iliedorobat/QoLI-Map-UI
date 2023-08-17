import {Component, Input} from '@angular/core';
import {AtlasFilterType} from '../atlas-filter.types';
import {FormGroup} from '@angular/forms';
import {LIFE_INDEX_CATEGORIES, LIFE_INDEX_YEARS} from '../atlas-filter.enums';
import {AtlasFilterService} from '../atlas-filter.service';

@Component({
  selector: 'app-atlas-filter-main-section',
  templateUrl: './atlas-filter-main-section.component.html'
})
export class AtlasFilterMainSectionComponent {
    constructor(
        private atlasFilterService: AtlasFilterService
    ) {}

    @Input() filter: AtlasFilterType = new AtlasFilterType();
    @Input() form: FormGroup = this.atlasFilterService.initFilter(this.filter);

    LIFE_INDEX_CATEGORIES = Object.values(LIFE_INDEX_CATEGORIES);
    LIFE_INDEX_YEARS = Object.values(LIFE_INDEX_YEARS);

    get category() {
        return this.form?.get('category');
    }

    get year() {
        return this.form?.get('year');
    }
}
