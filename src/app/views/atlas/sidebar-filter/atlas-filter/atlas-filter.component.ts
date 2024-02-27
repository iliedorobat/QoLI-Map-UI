import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import noop from 'lodash-es/noop';
import get from 'lodash-es/get';

import {AtlasFilterService} from './atlas-filter.service';
import {BackendService} from '@/app/views/atlas/services/backend.service';
import {IAtlasFilter} from './atlas-filter.types';

@Component({
    selector: 'app-atlas-filter',
    templateUrl: './atlas-filter.component.html',
    styleUrls: ['./atlas-filter.component.scss']
})
export class AtlasFilterComponent {
    constructor(
        private atlasFilterService: AtlasFilterService,
        private backendService: BackendService
    ) {}

    @Input() onActiveButtonResets: Function = noop;

    protected filter: IAtlasFilter = this.atlasFilterService.getTransitoryFilter(true);
    protected form: FormGroup = this.atlasFilterService.initializeFilterForm(this.filter);

    onFilterApply(): void {
        this.atlasFilterService.memoizeFilter(this.filter);
        this.backendService.lifeIndexSubscription(this.filter);
    }

    onSectionReset(event: Event): void {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const value = get(target, ['offsetParent', 'attributes', 'aria-controls', 'value']);
        const memoizedFilter = this.atlasFilterService.getMemoizedFilter();

        switch (value) {
            case 'atlas-filter-main-section':
                this.filter.baseFilter.reset(this.form, memoizedFilter)
                break;
            default:
                break;
        }
    }

    onReset(): void {
        this.atlasFilterService.reset(this.form);
    }

    onSubmit(): void {
        this.onFilterApply();
    }
}
