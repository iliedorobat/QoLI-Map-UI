import {Component, Input} from '@angular/core';
import {NgbActiveOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import noop from 'lodash-es/noop';

import {FilterService} from '@/app/shared/filter/filter.service';
import {SidebarFilter} from '@/app/views/sidebar';
import {ANALYSIS_TYPE} from '@/app/shared/constants/app.const';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['../../../assets/styles/filter.scss'],
    providers: [FilterService]
})
export class SidebarComponent {
    constructor(
        public activeOffcanvas: NgbActiveOffcanvas,
        protected filterService: FilterService,
        protected sidebarFilter: SidebarFilter
    ) {
        this.filterService.onReset();
    }

    protected readonly ANALYSIS_TYPE = ANALYSIS_TYPE;

    @Input() onActiveButtonResets: Function = noop;
    @Input() onToggleScore: Function = noop;

    onSidebarClose(): void {
        this.activeOffcanvas.dismiss('Cross click');
        this.onActiveButtonResets();
    }
}
