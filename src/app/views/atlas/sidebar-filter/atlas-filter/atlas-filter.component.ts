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

    protected filter: AtlasFilter = this.atlasFilterService.getInitialTransitoryFilter();
    protected form: FormGroup = this.atlasFilterService.getInitialFilterForm();

    onFilterApply(): void {
        this.atlasFilterService.setMemoizedFilter(this.filter);
        this.localService.lifeIndexSubscription(this.filter);
    }

    onSectionReset(event: Event): void {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const value = get(target, ['offsetParent', 'attributes', 'aria-controls', 'value']);
        const memoizedFilter = this.atlasFilterService.getMemoizedFilter();

        switch (value) {
            case 'atlas-filter-main-section':
                this.filter.primary.reset(memoizedFilter.primary);
                break;
            default:
                break;
        }

        // TODO:
        this.form = this.atlasFilterService.getNewFilterForm(this.filter);
    }

    onReset(): void {
        const memoizedFilter = this.atlasFilterService.getMemoizedFilter();
        this.filter.reset(memoizedFilter);
        this.form = this.atlasFilterService.getInitialFilterForm();
    }

    onSubmit(): void {
        this.onFilterApply();
    }
}
