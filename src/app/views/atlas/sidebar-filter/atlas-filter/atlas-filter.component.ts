import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import noop from 'lodash-es/noop';
import get from 'lodash-es/get';

import {IAtlasFilter} from './atlas-filter.types';
import {LocalService} from '@/app/views/atlas/services/local.service';
import {QoliFilterService} from './qoli-filter.service';

@Component({
    selector: 'app-atlas-filter',
    templateUrl: './atlas-filter.component.html',
    styleUrls: ['./atlas-filter.component.scss']
})
export class AtlasFilterComponent {
    constructor(
        private qoliFilterService: QoliFilterService,
        private localService: LocalService
    ) {}

    @Input() onActiveButtonResets: Function = noop;

    protected filter: IAtlasFilter = this.qoliFilterService.getTransitoryFilter(true);
    protected form: FormGroup = this.qoliFilterService.initializeFilterForm(this.filter);

    onFilterApply(): void {
        this.qoliFilterService.memoizeFilter(this.filter);
        this.localService.lifeIndexSubscription(this.filter);
    }

    onSectionReset(event: Event): void {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const value = get(target, ['offsetParent', 'attributes', 'aria-controls', 'value']);
        const memoizedFilter = this.qoliFilterService.getMemoizedFilter();

        switch (value) {
            case 'atlas-filter-main-section':
                this.filter.primaryFilter.reset(this.form, memoizedFilter.primaryFilter.qoliOptions)
                break;
            default:
                break;
        }
    }

    onReset(): void {
        this.qoliFilterService.reset(this.form);
    }

    onSubmit(): void {
        this.onFilterApply();
    }
}
