import {Component, Input} from '@angular/core';
import {AtlasFilterType} from '../atlas-filter.types';
import {FormControl, FormGroup} from '@angular/forms';
import {LIFE_INDEX_CATEGORIES, LIFE_INDEX_YEARS} from '../../../../../shared/constants/filter.enums';

@Component({
  selector: 'app-atlas-filter-main-section',
  templateUrl: './atlas-filter-main-section.component.html'
})
export class AtlasFilterMainSectionComponent {
    @Input() filter: AtlasFilterType = new AtlasFilterType();
    @Input() form: FormGroup = new FormGroup({
        category: new FormControl(this.filter.category, []),
        year: new FormControl(this.filter.category, [])
    });

    LIFE_INDEX_CATEGORIES = Object.values(LIFE_INDEX_CATEGORIES);
    LIFE_INDEX_YEARS = Object.values(LIFE_INDEX_YEARS);

    get category() {
        return this.form?.get('category');
    }

    get year() {
        return this.form?.get('year');
    }
}
