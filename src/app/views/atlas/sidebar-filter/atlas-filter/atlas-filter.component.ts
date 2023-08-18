import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as _ from 'lodash';

import {AtlasFilterService} from './atlas-filter.service';
import {AtlasFilterType} from './atlas-filter.types';
import {LocalService} from '../../services/local.service';

@Component({
  selector: 'app-atlas-filter',
  templateUrl: './atlas-filter.component.html',
  styleUrls: ['./atlas-filter.component.scss']
})
export class AtlasFilterComponent {
    constructor(
        private atlasFilterService: AtlasFilterService,
        private localService: LocalService
    ) {}

    @Input() onActiveButtonResets: Function = _.noop;

    filter: AtlasFilterType = this.atlasFilterService.getFilter();
    form: FormGroup = this.atlasFilterService.initFilterForm(this.filter);

    onFilterApply() {
        this.atlasFilterService.setFilter(this.filter);
        this.localService.lifeIndexSubscription(this.filter);
    }

    onSectionReset(event: Event) {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const value = _.get(target, ['offsetParent', 'attributes', 'aria-controls', 'value']);

        switch (value) {
            case 'atlas-filter-main-section':
                this.filter.category = null;
                this.filter.categoryLabel = null;
                this.filter.year = null;
                break;
            default:
                break;
        }

        this.atlasFilterService.setFilter(this.filter);
    }

    onReset() {
        this.form.reset();
    }

    onSubmit() {
        this.onFilterApply();
    }
}
