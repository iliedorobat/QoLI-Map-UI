import {Component, Input} from '@angular/core';
import noop from 'lodash-es/noop';
import get from 'lodash-es/get';

import {AtlasFilter} from './atlas-filter.types';
import {BackendService} from '@/app/views/atlas/services/backend.service';

@Component({
    selector: 'app-atlas-filter',
    templateUrl: './atlas-filter.component.html',
    styleUrls: ['./atlas-filter.component.scss']
})
export class AtlasFilterComponent {
    constructor(
        protected atlasFilter: AtlasFilter,
        private backendService: BackendService
    ) {
        this.onReset();
    }

    @Input() onActiveButtonResets: Function = noop;
    @Input() onToggleScore: Function = noop;

    onFilterApply(): void {
        this.atlasFilter.save();
        this.backendService.lifeIndexSubscription(this.atlasFilter);
        this.onToggleScore(true);
    }

    onSectionReset(event: Event): void {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const value = get(target, ['offsetParent', 'attributes', 'aria-controls', 'value']);

        switch (value) {
            case 'atlas-filter-aggregated-section':
                this.atlasFilter.aggregatedFilter.reset(this.atlasFilter.form);
                break;
            case 'atlas-filter-analysis-type-section':
                this.atlasFilter.analysisTypeFilter.reset(this.atlasFilter.form);
                break;
            default:
                break;
        }
    }

    onReset(): void {
        this.atlasFilter.reset();
    }
}
