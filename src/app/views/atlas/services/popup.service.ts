import {Injectable} from '@angular/core';

import {AtlasFilterService} from '../sidebar-filter/atlas-filter/atlas-filter.service';
import {DatasetService} from './dataset.service';
import {GeoFeature} from '../constants/geo.types';
import {LifeIndexResponseType} from '../constants/response.type';

import {SORT_ORDER} from '../../../shared/constants/math.const';

interface ElementParams {
    className?: string;
    innerText?: string;
    tagName: string;
}

@Injectable({
    providedIn: 'root'
})
export class PopupService {
    constructor(
        private atlasFilterService: AtlasFilterService,
        private datasetService: DatasetService
    ) {}

    public createPopupContent = (geoLand: GeoFeature, response: LifeIndexResponseType) => {
        const content = document.createElement('div');
        content.className = "content";

        const header = this.createHeader(geoLand);
        content.appendChild(header);

        const body = this.createBody(geoLand, response);
        content.appendChild(body);

        return content;
    };

    private createHeader = (geoLand: GeoFeature): HTMLDivElement => {
        const countryName = geoLand.properties.NAME_ENGL;
        const header = document.createElement('div');
        header.className = 'header';
        header.innerText = countryName;

        return header;
    }

    private createBody = (geoLand: GeoFeature, response: LifeIndexResponseType): HTMLElement => {
        const countryCode = geoLand.id;
        const score = countryCode ? response[countryCode] : 0 as number;
        const filter = this.atlasFilterService.getFilter();
        const sortedResponse = this.datasetService.getSortedResponse(response, SORT_ORDER.DESC);
        const rank = sortedResponse.findIndex(item => item[0] === countryCode) + 1;

        const bodyElement = this.createElement({
            className: 'body',
            tagName: 'div'
        } as ElementParams);

        const categoryLabelElement = this.createLabelElement('Dimension Name');
        const categoryElement = this.createValueElement(filter.categoryLabel);

        const rankLabelElement = this.createLabelElement('Rank');
        const rankElement = this.createValueElement(`${rank} of ${sortedResponse.length}`);

        const scoreLabelElement = this.createLabelElement('Value');
        const scoreElement = this.createValueElement(score);

        const yearLabelElement = this.createLabelElement('Year');
        const yearElement = this.createValueElement(filter.year);

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

    private createElement = (params: ElementParams): HTMLElement => {
        const {className, innerText, tagName} = params;
        const element = document.createElement(tagName);

        if (innerText) {
            element.innerText = innerText as string;
        }

        if (className) {
            element.className = className;
        }

        return element;
    }

    private createLabelElement = (label: string): HTMLElement => {
        return this.createElement({
            className: 'label',
            innerText: `${label}:`,
            tagName: 'div'
        } as ElementParams);
    }

    private createValueElement = (value: string | number | null): HTMLElement => {
        return this.createElement({
            className: 'value',
            innerText: value,
            tagName: 'div'
        } as ElementParams);
    }
}
