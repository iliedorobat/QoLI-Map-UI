import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {NgbAccordion, NgbActiveModal, NgbPanel, NgbPanelContent, NgbPanelTitle} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import Chart from 'chart.js/auto';
import noop from 'lodash-es/noop';

import {
    AggregatedFilterComponent,
    BaseFilterComponent,
    IndividuallyFilterComponent,
    Filter
} from '@/app/shared/filter';
import {ANALYSIS_TYPE} from '@/app/shared/constants/app.const';
import {BackendService} from '@/app/views/atlas/services/backend.service';
import {BaseStatsScreenService} from '@/app/views/stats/base/base-stats-screen.service';
import {FilterService} from '@/app/shared/filter/filter.service';

@Component({
    selector: 'app-stats-screen',
    templateUrl: './base-stats-screen.component.html',
    standalone: true,
    styleUrls: [
        '../../../../assets/styles/filter.scss',
        './base-stats-screen.component.scss'
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
    ],
    providers: [BaseStatsScreenService]
})
export class BaseStatsScreenComponent implements OnInit {
    constructor(
        private activeModal: NgbActiveModal,
        private backendService: BackendService,
        protected filter: Filter,
        protected filterService: FilterService,
        private statsService: BaseStatsScreenService
    ) {}

    protected readonly ANALYSIS_TYPE = ANALYSIS_TYPE;
    protected chart: Chart | undefined;

    ngOnInit(): void {
        this.chart = this.statsService.initChart('stats');
        this.backendService.lifeIndex$
            .subscribe(scores => {
                this.statsService.updateChart(this.chart, scores);
            });
    }

    @Input() onActiveButtonResets: Function = noop;

    onViewClose = () => {
        this.activeModal.close();
        this.onActiveButtonResets();
    };
}
