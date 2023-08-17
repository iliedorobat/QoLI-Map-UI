import {Component, Input} from '@angular/core';
import {LifeIndexFilterType} from '../../../atlas/types/LifeIndexFilter.types';
import {FormControl, FormGroup} from '@angular/forms';
import {LIFE_INDEX_CATEGORIES, LIFE_INDEX_YEARS} from '../../../../shared/constants/filter.enums';

@Component({
  selector: 'app-global-filter-main-section',
  templateUrl: './global-filter-main-section.component.html',
  styleUrls: ['./global-filter-main-section.component.scss']
})
export class GlobalFilterMainSectionComponent {
    @Input() filter: LifeIndexFilterType = new LifeIndexFilterType();
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
