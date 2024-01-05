import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import noop from 'lodash-es/noop';
import get from 'lodash-es/get';

import {AtlasFilterService} from './atlas-filter.service';
import {AtlasFilter} from './atlas-filter.types';
import {LocalService} from '@/app/views/atlas/services/local.service';

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

    @Input() onActiveButtonResets: Function = noop;

    protected filter: AtlasFilter = this.atlasFilterService.getFilter();
    protected prevFilter: AtlasFilter = structuredClone(this.filter) as AtlasFilter;
    protected form: FormGroup = this.atlasFilterService.getNewFilterForm(this.filter);

    onFilterApply(): void {
        this.atlasFilterService.setFilter(this.filter);
        this.localService.lifeIndexSubscription(this.filter);
    }

    onSectionReset(event: Event): void {
        event.stopPropagation();
        // TODO: fix the reset button
        // const target = event.target as HTMLElement;
        // const value = get(target, ['offsetParent', 'attributes', 'aria-controls', 'value']);

        // switch (value) {
        //     case 'atlas-filter-main-section':
        //         this.filter.category = this.prevFilter.category;
        //         this.filter.categoryLabel = this.prevFilter.categoryLabel;
        //         this.filter.year = this.prevFilter.year;
        //         break;
        //     default:
        //         break;
        // }

        this.atlasFilterService.setFilter(this.prevFilter);
        this.form = this.atlasFilterService.getNewFilterForm(this.prevFilter);
    }

    onReset(): void {
        this.form.reset();
    }

    onSubmit(): void {
        this.onFilterApply();
    }
}
