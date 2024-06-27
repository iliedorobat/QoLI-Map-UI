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
import {FilterService} from '@/app/shared/filter/filter.service';
import {StatsScreenService} from '@/app/views/stats/stats-screen.service';

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
    ],
    providers: [StatsScreenService]
})
export class StatsScreenComponent implements OnInit {
    constructor(
        private activeModal: NgbActiveModal,
        private backendService: BackendService,
        protected filter: Filter,
        protected filterService: FilterService,
        private statsService: StatsScreenService
    ) {}

    protected readonly ANALYSIS_TYPE = ANALYSIS_TYPE;
    protected chart: Chart | undefined;

    ngOnInit(): void {
        this.chart = this.statsService.initChart('stats');
        this.backendService.lifeIndex$
            .subscribe(scores => {
                this.statsService.updateChart(
                    this.chart,
                    // TODO: prepareLifeIndex
                    this.backendService.prepareLifeIndex(scores, this.filter.baseFilter.startYear)
                );
            });
    }

    @Input() onActiveButtonResets: Function = noop;

    onViewClose = () => {
        this.activeModal.close();
        this.onActiveButtonResets();
    };
}
