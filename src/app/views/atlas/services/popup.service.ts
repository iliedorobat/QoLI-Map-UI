import {Injectable} from '@angular/core';
import {PopupOptions} from 'leaflet';

import {AtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';
import {DatasetService} from './dataset.service';
import {GeoFeature} from '@/app/views/atlas/constants/geo.types';
import {HTMLElementParams, HtmlElementsService} from './html-elements.service';
import {LifeIndexResponse} from '@/app/views/atlas/constants/response.types';

import {SORT_ORDER} from '@/app/shared/constants/math.const';

@Injectable({
    providedIn: 'root'
})
export class PopupService {
    constructor(
        private atlasFilter: AtlasFilter,
        private datasetService: DatasetService,
        private htmlElementsService: HtmlElementsService
    ) {}

    public createContent(geoLand: GeoFeature, response: LifeIndexResponse) {
        const score = this.datasetService.getScore(geoLand, response);

        const content = document.createElement('div');
        content.className = 'content';

        const header = this.createHeader(geoLand);
        content.appendChild(header);

        // Avoid adding the body if the country have been filtered out
        if (score > this.datasetService.EXCLUDED_COUNTRY_SCORE) {
            const body = this.createBody(geoLand, response);
            content.appendChild(body);
        }

        return content;
    }

    public getOptions(): PopupOptions {
        return {
            className: 'land-summary'
        } as PopupOptions;
    }

    private createHeader(geoLand: GeoFeature): HTMLElement {
        const countryName = this.getCountryName(geoLand);

        return this.htmlElementsService.createElement({
            className: 'header',
            innerText: countryName,
            tagName: 'div'
        } as HTMLElementParams);
    }

    private createBody(geoLand: GeoFeature, response: LifeIndexResponse): HTMLElement {
        const countryCode = geoLand.id;
        const score = this.datasetService.getScore(geoLand, response);
        const sortedResponse = this.datasetService.getSortedResponse(response, SORT_ORDER.DESC);
        const rank = sortedResponse.findIndex(item => item[0] === countryCode) + 1;

        const bodyElement = this.htmlElementsService.createElement({
            className: 'body',
            tagName: 'div'
        } as HTMLElementParams);

        const rankLabelElement = this.htmlElementsService.createLabelElement('Rank');
        const rankElement = this.htmlElementsService.createValueElement(`${rank} of ${sortedResponse.length}`);

        const scoreLabelElement = this.htmlElementsService.createLabelElement('Value');
        const scoreElement = this.htmlElementsService.createValueElement(score);

        const yearLabelElement = this.htmlElementsService.createLabelElement('Year');
        const yearElement = this.htmlElementsService.createValueElement(this.atlasFilter.baseFilter.year);

        bodyElement.appendChild(yearLabelElement);
        bodyElement.appendChild(yearElement);

        bodyElement.appendChild(scoreLabelElement);
        bodyElement.appendChild(scoreElement);

        bodyElement.appendChild(rankLabelElement);
        bodyElement.appendChild(rankElement);

        return bodyElement;
    }

    private getCountryName(geoLand: GeoFeature): string {
        const countryName = geoLand.properties.NAME_ENGL;

        if (['Kazakhstan', 'Russian Federation'].includes(countryName)) {
            return `${countryName} (European territory)`
        }

        return countryName;
    }
}
