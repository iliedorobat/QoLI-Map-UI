import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as _ from 'lodash';
import {AtlasFilterType} from './atlas-filter.types';
import {AtlasFilterService} from './atlas-filter.service';

@Component({
  selector: 'app-atlas-filter',
  templateUrl: './atlas-filter.component.html',
  styleUrls: ['./atlas-filter.component.scss']
})
export class AtlasFilterComponent {
    constructor(
        private atlasFilterService: AtlasFilterService
    ) {}

    @Input() filter: AtlasFilterType = new AtlasFilterType();
    @Input() onActiveButtonResets: Function = _.noop;
    @Input() onFilterApply: Function = _.noop;

    form: FormGroup = this.atlasFilterService.initFilter(this.filter);

    onSectionReset(event: Event) {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const value = _.get(target, ['offsetParent', 'attributes', 'aria-controls', 'value']);

        switch (value) {
            case 'atlas-filter-main-section':
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
