import {Injectable} from '@angular/core';
import Chart from 'chart.js/auto';

import {Filter} from '@/app/shared/filter';
import {ANALYSIS_TYPE, COUNTRIES} from '@/app/shared/constants/app.const';

@Injectable({
    providedIn: 'root'
})
export class StatsScreenService {
    constructor(protected filter: Filter) {}

    private isAggregateAnalysis = () => {
        return this.filter.baseFilter.analysisType === ANALYSIS_TYPE.AGGREGATE;
    }

    private getChartLabel = () => {
        return this.isAggregateAnalysis()
            ? `${this.filter.aggregatedFilter.selectedIndicators.length} Selected Indicators`
            : this.filter.individuallyFilter.selectedIndicator.label;
    };

    private getChartTitle = () => {
        return `QoLI Stats For The Year ${this.filter.baseFilter.year}`;
    };

    private updateChartDatasets = (chart: Chart, scores: {[index: string]: number}) => {
        chart.data.datasets.forEach(dataset => {
            dataset.label = this.getChartLabel();
            dataset.data = Object.values(scores);
        });
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

    private updateChartLabels = (chart: Chart, scores: {[index: string]: number}) => {
        chart.data.labels = Object.keys(scores);
        chart.update();
    };

    private updateChartTitle = (chart: Chart) => {
        const title = chart?.options?.plugins?.title;

        if (title?.text) {
            title.text = this.getChartTitle();
        }

        chart.update();
    };

    public updateChart = (chart: Chart | undefined, scores: { [p: string]: number }) => {
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
                        {
                            label: this.getChartLabel(),
                            data: [],
                            borderWidth: 2,
                            borderRadius: 4,
                            borderSkipped: false
                        }
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

