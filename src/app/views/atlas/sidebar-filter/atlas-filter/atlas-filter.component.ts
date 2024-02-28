import {Component, Input, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import noop from 'lodash-es/noop';
import get from 'lodash-es/get';

import {AtlasFilterMainSectionComponent} from '../atlas-filter/atlas-filter-main-section/atlas-filter-main-section.component';
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

    @ViewChild(AtlasFilterMainSectionComponent) child: AtlasFilterMainSectionComponent | undefined;
    @Input() onActiveButtonResets: Function = noop;

    protected filter: IAtlasFilter = this.atlasFilterService.getFilter();
    protected form: FormGroup = this.atlasFilterService.initializeFilterForm(this.filter);

    onFilterApply(): void {
        this.atlasFilterService.saveFilter(this.form);
        this.backendService.lifeIndexSubscription(this.filter);
    }

    onSectionReset(event: Event): void {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const value = get(target, ['offsetParent', 'attributes', 'aria-controls', 'value']);

        switch (value) {
            case 'atlas-filter-main-section':
                // FIXME:
                this.filter.baseFilter.resetFilterForm(this.form, this.filter);
                this.child?.resetSelectedItems();
                break;
            default:
                break;
        }
    }

    onReset(): void {
        this.atlasFilterService.resetFilterForm(this.form);
        this.child?.resetSelectedItems();
    }

    onSubmit(): void {
        this.onFilterApply();
    }
}
