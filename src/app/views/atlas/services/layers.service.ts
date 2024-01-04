import {Injectable} from '@angular/core';
import {GeoJSON, geoJSON, Layer, Map} from 'leaflet';
import * as _ from 'lodash';

import {DatasetService} from './dataset.service';
import {GeoFeature} from '../constants/geo.types';
import {LayerEventsService} from './layer-events.service';
import {LifeIndexResponseType} from '../constants/response.types';

import * as COUNTRIES from '../../../../../files/geo-location/european-union.json';
import {SORT_ORDER} from '../../../shared/constants/math.const';

const FEATURES = _.get(COUNTRIES, 'features', []) as Array<GeoFeature>;

@Injectable({
    providedIn: 'root',
})
export class LayersService {
    constructor(
        public eventsService: LayerEventsService,
        private datasetService: DatasetService,
    ) {}

    onLayersReady(map: Map, layers: (Layer | GeoJSON)[], response: LifeIndexResponseType) {
        const countriesLayers = FEATURES.map(county => this.getFeatureLayer(map, county, response));
        layers.push(...countriesLayers);
    }

    public getFeatureLayer = (map: Map, geoLand: GeoFeature, response: LifeIndexResponseType) => {
        const countryCode = geoLand.id as string;
        const score = this.datasetService.getScore(geoLand, response);
        const geoJsonObject = geoLand.geometry;
        const options = {
            style: () => ({
                color: this.getColor(response, score, countryCode),
                fillColor: this.getColor(response, score, countryCode),
                fillOpacity: 0.6,
                opacity: 0.8,
                weight: 3
            })
        };

        const layer = geoJSON(geoJsonObject, options);
        this.eventsService.addEvents(map, layer, geoLand, response);

        return layer;
    };

    private getColor = (response: LifeIndexResponseType, score: number, countryCode: string) => {
        const sortedResponse = this.datasetService.getSortedResponse(response, SORT_ORDER.DESC);
        const rank = sortedResponse.findIndex(item => item[0] === countryCode) + 1;

        switch (true) {
            case rank <= 3: return '#001146';
            case rank <= 9: return '#00116e';
            case rank <= 15: return '#0011aa';
            case rank <= 18: return '#3753f2';
            case rank <= 21: return '#809fff';
            case rank <= 24: return '#fc7272';
            case rank <= 26: return '#fc4949';
            default: return '#e60000';
        }
    };

    /** @deprecated: it is no longer used */
    private prepareEdges = (response: LifeIndexResponseType) => {
        const values = Object.values(response);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const diff = maxValue - minValue;

        return {
            diff,
            minValue,
            maxValue
        }
    }
}
