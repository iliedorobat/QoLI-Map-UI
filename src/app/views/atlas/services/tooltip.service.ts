import {Injectable} from '@angular/core';
import {Direction, PointTuple, TooltipOptions} from 'leaflet';

import {DatasetService} from './dataset.service';
import {GeoFeature} from '../constants/geo.types';
import {HTMLElementParams, HtmlElementsService} from './html-elements.service';
import {LifeIndexResponse} from '../constants/response.types';

import {SORT_ORDER} from '@/app/shared/constants/math.const';

const BOTTOM_LIST = ['LU'];
const LEFT_LIST = ['BE', 'SI'];
const RIGHT_LIST = ['BG', 'EE', 'HR', 'HU', 'LT', 'LV', 'RO', 'SK'];

@Injectable({
    providedIn: 'root'
})
export class TooltipService {
    constructor(
        private datasetService: DatasetService,
        private htmlElementsService: HtmlElementsService
    ) {}

    public createContent(geoLand: GeoFeature, response: LifeIndexResponse) {
        const content = document.createElement('div');
        content.className = 'content';

        const header = this.createHeader(geoLand, response);
        content.appendChild(header);

        // const body = this.createBody(geoLand, response);
        // content.appendChild(body);

        return content;
    }

    public getOptions(geoLand: GeoFeature): TooltipOptions {
        const countryCode = geoLand.id as string;
        return {
            className: 'land-score',
            direction: this.getDirection(countryCode),
            offset: this.getOffset(countryCode),
            permanent: true
        } as TooltipOptions;
    }

    private createHeader(geoLand: GeoFeature, response: LifeIndexResponse): HTMLElement {
        const countryName = geoLand.properties.NAME_ENGL;
        const score = this.datasetService.getScoreStr(geoLand, response, 4);
        const headerElement = this.htmlElementsService.createElement({
            className: 'header',
            tagName: 'div'
        } as HTMLElementParams);

        const scoreLabelElement = this.htmlElementsService.createLabelElement(countryName);
        const scoreElement = this.htmlElementsService.createValueElement(score);

        headerElement.appendChild(scoreLabelElement);
        headerElement.appendChild(scoreElement);

        return headerElement;
    }

    private createBody(geoLand: GeoFeature, response: LifeIndexResponse): HTMLElement {
        const countryCode = geoLand.id;
        const sortedResponse = this.datasetService.getSortedResponse(response, SORT_ORDER.DESC);
        const rank = sortedResponse.findIndex(item => item[0] === countryCode) + 1;

        const bodyElement = this.htmlElementsService.createElement({
            className: 'body',
            tagName: 'div'
        } as HTMLElementParams);

        const rankLabelElement = this.htmlElementsService.createLabelElement('Rank');
        const rankElement = this.htmlElementsService.createValueElement(`${rank} of ${sortedResponse.length}`);

        bodyElement.appendChild(rankLabelElement);
        bodyElement.appendChild(rankElement);

        return bodyElement;
    }

    private getOffset(countryCode: string): PointTuple {
        switch (countryCode) {
            case 'BE':
                return [-10, -10];
            case 'BG':
                return [40, 0];
            case 'CY':
                return [0, -5];
            case 'CZ':
                return [15, -20];
            case 'DK':
                return [-120, -40];
            case 'EE':
                return [30, 0];
            case 'EL':
                return [-180, -100];
            case 'ES':
                return [-150, -40];
            case 'FI':
                return [-30, 200];
            case 'FR':
                return [-1200, -1700];
            case 'HR':
                return [-10, 30];
            case 'HU':
                return [20, 0];
            case 'LT':
                return [35, 20];
            case 'LU':
                return [0, 6];
            case 'LV':
                return [60, 0];
            case 'MT':
                return [0, -5];
            case 'PL':
                return [10, -30];
            case 'RO':
                return [50, -20];
            case 'SE':
                return [-50, 200];
            case 'SI':
                return [-20 ,0];
            case 'SK':
                return [45, -10];
            default:
                return [0, 0];
        }
    }

    private getDirection(countryCode: string): Direction {
        if (LEFT_LIST.includes(countryCode)) {
            return 'left';
        } else if (RIGHT_LIST.includes(countryCode)) {
            return 'right';
        } else if (BOTTOM_LIST.includes(countryCode)) {
            return 'bottom';
        }
        return 'top';
    }
}
