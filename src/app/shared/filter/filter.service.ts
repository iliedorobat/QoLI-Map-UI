import {Injectable} from '@angular/core';
import get from 'lodash-es/get';

import {BackendService} from '@/app/views/atlas/services/backend.service';
import {SidebarFilter} from '@/app/views/sidebar';

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    constructor(
        private backendService: BackendService,
        private sidebarFilter: SidebarFilter
    ) {}

    onFilterApply(onToggleScore?: Function): void {
        this.sidebarFilter.save();
        this.backendService.lifeIndexSubscription(this.sidebarFilter);
        onToggleScore && onToggleScore(true);
    }

    onSectionReset(event: Event): void {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const value = get(target, ['offsetParent', 'attributes', 'aria-controls', 'value']);

        switch (value) {
            case 'sidebar-main-section':
                this.sidebarFilter.aggregatedFilter.reset(this.sidebarFilter.form);
                this.sidebarFilter.baseFilter.reset(this.sidebarFilter.form);
                this.sidebarFilter.individuallyFilter.reset(this.sidebarFilter.form);
                break;
            default:
                break;
        }
    }

    public onReset(): void {
        this.sidebarFilter.reset();
    }
}
