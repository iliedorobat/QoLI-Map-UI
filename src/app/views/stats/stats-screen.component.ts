import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {NgbAccordion, NgbActiveModal, NgbPanel, NgbPanelContent, NgbPanelTitle} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import get from 'lodash-es/get';
import noop from 'lodash-es/noop';

import {
    AggregatedFilterComponent,
    BaseFilterComponent,
    IndividuallyFilterComponent,
    SidebarFilter
} from '@/app/views/sidebar';
import {ANALYSIS_TYPE} from '@/app/shared/constants/app.const';
import {BackendService} from '@/app/views/atlas/services/backend.service';

@Component({
    selector: 'app-stats-screen',
    templateUrl: './stats-screen.component.html',
    standalone: true,
    styleUrls: [
        '../../../assets/styles/filter.scss',
        './stats-screen.component.scss'
    ],
    imports: [
        AggregatedFilterComponent,
        BaseFilterComponent,
        CommonModule,
        IndividuallyFilterComponent,
        NgbAccordion,
        NgbPanel,
        NgbPanelContent,
        NgbPanelTitle,
        ReactiveFormsModule
    ]
})
export class StatsScreenComponent {
    constructor(
        public activeModal: NgbActiveModal,
        private backendService: BackendService,
        protected sidebarFilter: SidebarFilter
    ) {}
    protected readonly ANALYSIS_TYPE = ANALYSIS_TYPE;

    @Input() onActiveButtonResets: Function = noop;
    // TODO:
    @Input() onToggleScore: Function = noop;

    onViewClose = () => {
        this.activeModal.close();
        this.onActiveButtonResets();
    };

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
