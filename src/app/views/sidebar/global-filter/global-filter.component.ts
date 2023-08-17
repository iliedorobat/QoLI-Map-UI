import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as _ from 'lodash';
import {LifeIndexFilterType} from '../../atlas/types/LifeIndexFilter.types';
import {GlobalFilterService} from './global-filter.service';

@Component({
  selector: 'app-global-filter',
  templateUrl: './global-filter.component.html',
  styleUrls: ['./global-filter.component.scss']
})
// TODO: rename it to AtlasFilterComponent
export class GlobalFilterComponent {
    constructor(
        private globalFilterService: GlobalFilterService
    ) {}

    @Input() filter: LifeIndexFilterType = new LifeIndexFilterType();
    @Input() onActiveButtonResets: Function = _.noop;
    @Input() onFilterApply: Function = _.noop;

    form: FormGroup = this.globalFilterService.initGlobalFilter(this.filter);

    onSectionReset(event: Event) {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const value = _.get(target, ['offsetParent', 'attributes', 'aria-controls', 'value']);

        switch (value) {
            case 'global-filter-main-section':
                this.filter.category = null;
                this.filter.year = null;
                break;
            default:
                break;
        }
    }

    onReset() {
        this.form.reset();
    }

    onSubmit() {
        this.onFilterApply();
    }
}
