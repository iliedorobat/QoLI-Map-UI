import {Injectable} from '@angular/core';
import {PopupOptions} from 'leaflet';

import {AtlasFilterService} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.service';
import {DatasetService} from './dataset.service';
import {GeoFeature} from '@/app/views/atlas/constants/geo.types';
import {HTMLElementParams, HtmlElementsService} from './html-elements.service';
import {LifeIndexResponseType} from '@/app/views/atlas/constants/response.types';

import {SORT_ORDER} from '@/app/shared/constants/math.const';

@Injectable({
    providedIn: 'root'
})
export class PopupService {
    constructor(
        private atlasFilterService: AtlasFilterService,
        private datasetService: DatasetService,
        private htmlElementsService: HtmlElementsService
    ) {}

    public createContent = (geoLand: GeoFeature, response: LifeIndexResponseType) => {
        const content = document.createElement('div');
        content.className = 'content';

        const header = this.createHeader(geoLand);
        content.appendChild(header);

        const body = this.createBody(geoLand, response);
        content.appendChild(body);

        return content;
    };

    public getOptions = (): PopupOptions => {
        return {
            className: 'land-summary'
        } as PopupOptions;
    }

    private createHeader = (geoLand: GeoFeature): HTMLElement => {
        const countryName = geoLand.properties.NAME_ENGL;

        return this.htmlElementsService.createElement({
            className: 'header',
            innerText: countryName,
            tagName: 'div'
        } as HTMLElementParams);
    }

    private createBody = (geoLand: GeoFeature, response: LifeIndexResponseType): HTMLElement => {
        const countryCode = geoLand.id;
        const score = this.datasetService.getScore(geoLand, response);
        const filter = this.atlasFilterService.getFilter();
        const sortedResponse = this.datasetService.getSortedResponse(response, SORT_ORDER.DESC);
        const rank = sortedResponse.findIndex(item => item[0] === countryCode) + 1;

        const bodyElement = this.htmlElementsService.createElement({
            className: 'body',
            tagName: 'div'
        } as HTMLElementParams);

        const categoryLabelElement = this.htmlElementsService.createLabelElement('Name');
        const categoryElement = this.htmlElementsService.createValueElement(filter.categoryLabel);

        const rankLabelElement = this.htmlElementsService.createLabelElement('Rank');
        const rankElement = this.htmlElementsService.createValueElement(`${rank} of ${sortedResponse.length}`);

        const scoreLabelElement = this.htmlElementsService.createLabelElement('Value');
        const scoreElement = this.htmlElementsService.createValueElement(score);

        const yearLabelElement = this.htmlElementsService.createLabelElement('Year');
        const yearElement = this.htmlElementsService.createValueElement(filter.year);

        bodyElement.appendChild(categoryLabelElement);
        bodyElement.appendChild(categoryElement);

        bodyElement.appendChild(yearLabelElement);
        bodyElement.appendChild(yearElement);

        bodyElement.appendChild(scoreLabelElement);
        bodyElement.appendChild(scoreElement);

        bodyElement.appendChild(rankLabelElement);
        bodyElement.appendChild(rankElement);

        return bodyElement;
    }
}
