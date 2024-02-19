import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import noop from 'lodash-es/noop';
import get from 'lodash-es/get';

import {QoliFilterService} from '@/app/views/atlas/sidebar-filter/atlas-filter/qoli-filter.service';
import {LocalService} from '@/app/views/atlas/services/local.service';
import {IQoLI} from '@/app/views/atlas/constants/qoli.types';

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

    protected filter: IQoLI = this.qoliFilterService.getTransitoryFilter(true);
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

        // FIXME: revisit
        // switch (value) {
        //     case 'atlas-filter-main-section':
        //         this.filter.primary.reset(memoizedFilter.primary);
        //         // TODO: reset section
        //         this.atlasFilterService.resetFilterForm(this.form);
        //         break;
        //     default:
        //         break;
        // }
    }

    onReset(): void {
        // TODO: revisit: this.qoliFilterService.resetFilter(this.filter);
        this.qoliFilterService.resetFilter();
        this.qoliFilterService.resetFilterForm(this.form);
    }

    onSubmit(): void {
        this.onFilterApply();
    }
}
