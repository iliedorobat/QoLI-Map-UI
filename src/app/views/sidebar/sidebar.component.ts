import {Component, Input} from '@angular/core';
import {NgbActiveOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import get from 'lodash-es/get';
import noop from 'lodash-es/noop';

import {BackendService} from '@/app/views/atlas/services/backend.service';
import {SidebarFilter} from '@/app/views/sidebar';
import {ANALYSIS_TYPE} from '@/app/shared/constants/app.const';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    constructor(
        public activeOffcanvas: NgbActiveOffcanvas,
        private backendService: BackendService,
        protected sidebarFilter: SidebarFilter
    ) {
        this.onReset();
    }

    protected readonly ANALYSIS_TYPE = ANALYSIS_TYPE;

    @Input() onActiveButtonResets: Function = noop;
    @Input() onToggleScore: Function = noop;

    onSidebarClose(): void {
        this.activeOffcanvas.dismiss('Cross click');
        this.onActiveButtonResets();
    }

    onFilterApply(): void {
        this.sidebarFilter.save();
        this.backendService.lifeIndexSubscription(this.sidebarFilter);
        this.onToggleScore(true);
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

    onReset(): void {
        this.sidebarFilter.reset();
    }
}
