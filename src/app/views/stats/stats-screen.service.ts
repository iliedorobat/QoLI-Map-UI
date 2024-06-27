import {Injectable} from '@angular/core';
import Chart from 'chart.js/auto';

import {BackendService} from '@/app/views/atlas/services/backend.service';
import {Filter} from '@/app/shared/filter';
import {LifeIndexMultipleResponses} from '@/app/views/atlas/constants/response.types';
import {ANALYSIS_TYPE, COUNTRIES} from '@/app/shared/constants/app.const';

@Injectable({
    providedIn: 'root'
})
export class StatsScreenService {
    constructor(
        private backendService: BackendService,
        protected filter: Filter
    ) {}

    private isAggregateAnalysis = () => {
        return this.filter.baseFilter.analysisType === ANALYSIS_TYPE.AGGREGATE;
    }

    private getChartTitle = () => {
        const {startYear, endYear} = this.filter.baseFilter;
        const label = this.isAggregateAnalysis()
            ? 'QoLI Stats'
            : this.filter.individuallyFilter.selectedIndicator.label;

        return startYear === endYear
            ? `${label} For The Year ${this.filter.baseFilter.startYear}`
            : `${label} For The Period ${startYear} - ${endYear}`;
    };

    private initDataset = (data: number[] = []) => {
        return {
            label: 'QoLI Stats',
            data,
            borderWidth: 2,
            borderRadius: 4,
            borderSkipped: false
        };
    };

    private updateChartDatasets = (chart: Chart, scores: LifeIndexMultipleResponses) => {
        const {startYear, endYear} = this.filter.baseFilter;
        const datasets = [];

        for (let year = startYear; year <= endYear; year++) {
            const data = this.backendService.reduceLifeIndexes(scores, year);
            const dataset = this.initDataset(Object.values(data));
            dataset.label = year.toString();
            datasets.push(dataset);
        }

        chart.data.datasets = datasets;
        chart.update();
    };

    private updateChartLabel = (chart: Chart) => {
        const tooltip = chart?.options?.plugins?.tooltip;
        const isAggregateAnalysis = this.isAggregateAnalysis();
        const filter = this.filter;

        if (tooltip?.callbacks) {
            tooltip.callbacks.label = function(context) {
                let units = !isAggregateAnalysis
                    ? filter.individuallyFilter.selectedIndicator.units
                    : '';

                if (units === 'number') {
                    // E.g.: "Police-recorded Offences - X"
                    units = '';
                } else if (units.toLowerCase().startsWith('scores')) {
                    // E.g. "Population Trust in X"
                    units = `(${units})`;
                }

                return `${context.formattedValue} ${units}`;
            }
        }

        chart.update();
    };

    private updateChartLabels = (chart: Chart, scores: LifeIndexMultipleResponses) => {
        chart.data.labels = this.filter.baseFilter.countries;
        chart.update();
    };

    private updateChartTitle = (chart: Chart) => {
        const title = chart?.options?.plugins?.title;

        if (title?.text) {
            title.text = this.getChartTitle();
        }

        chart.update();
    };

    public updateChart = (chart: Chart | undefined, scores: LifeIndexMultipleResponses) => {
        if (chart === undefined) {
            return;
        }

        this.updateChartDatasets(chart, scores);
        this.updateChartLabel(chart);
        this.updateChartLabels(chart, scores);
        this.updateChartTitle(chart);
    };

    public initChart = (id: string) => {
        return new Chart(
            id,
            {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [
                        this.initDataset()
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: this.getChartTitle()
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.formattedValue;
                                },
                                title: (context) => {
                                    const countryCode = context[0].label;
                                    return COUNTRIES[countryCode];
                                }
                            }
                        }
                    }
                }
            }
        );
    };
}

