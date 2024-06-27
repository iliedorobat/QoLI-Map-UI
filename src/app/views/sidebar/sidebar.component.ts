import {Component, Input} from '@angular/core';
import {NgbActiveOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import noop from 'lodash-es/noop';

import {Filter} from '@/app/shared/filter';
import {FilterService} from '@/app/shared/filter/filter.service';
import {ANALYSIS_TYPE} from '@/app/shared/constants/app.const';

@Component({
    selector: 'qoli-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['../../../assets/styles/filter.scss'],
    providers: [FilterService]
})
export class SidebarComponent {
    constructor(
        public activeOffcanvas: NgbActiveOffcanvas,
        protected filter: Filter,
        protected filterService: FilterService
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
