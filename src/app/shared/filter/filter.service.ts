import {Injectable} from '@angular/core';
import get from 'lodash-es/get';

import {BackendService} from '@/app/views/atlas/services/backend.service';
import {Filter} from '@/app/shared/filter/index';

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    constructor(
        private backendService: BackendService,
        private filter: Filter
    ) {}

    onFilterApply(onToggleScore?: Function): void {
        this.filter.save();
        this.backendService.lifeIndexSubscription(this.filter);
        onToggleScore && onToggleScore(true);
    }

    onSectionReset(event: Event): void {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const value = get(target, ['offsetParent', 'attributes', 'aria-controls', 'value']);

        switch (value) {
            case 'sidebar-main-section':
                this.filter.aggregatedFilter.reset(this.filter.form);
                this.filter.baseFilter.reset(this.filter.form);
                this.filter.individuallyFilter.reset(this.filter.form);
                break;
            default:
                break;
        }
    }

    public onReset(): void {
        this.filter.reset();
    }
}
