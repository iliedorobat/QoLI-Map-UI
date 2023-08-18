import {Injectable} from '@angular/core';
import {GeoJSON, geoJSON, Layer, Map} from 'leaflet';
import * as _ from 'lodash';

import {GeoFeature} from '../constants/geo.types';
import {LayerEventsService} from './layer-events.service';
import {LifeIndexResponseType} from '../constants/response.type';

import * as COUNTRIES from '../../../../../files/geo-location/european-union.json';

const FEATURES = _.get(COUNTRIES, 'features', []) as Array<GeoFeature>;

@Injectable({
    providedIn: 'root',
})
export class LayersService {
    constructor(
        public eventsService: LayerEventsService
    ) {}

    onLayersReady(map: Map, layers: (Layer | GeoJSON)[], response: LifeIndexResponseType) {
        const countriesLayers = FEATURES.map(county => this.getFeatureLayer(map, county, response));
        layers.push(...countriesLayers);
    }

    public getFeatureLayer = (map: Map, geoLand: GeoFeature, response: LifeIndexResponseType) => {
        const country = geoLand.id;
        const score = country ? response[country] : 0;

        const geoJsonObject = geoLand.geometry;
        const options = {
            style: () => ({
                color: this.getColor(response, score),
                fillColor: this.getColor(response, score),
                fillOpacity: 0.6,
                opacity: 0.8,
                weight: 3
            })
        };

        const layer = geoJSON(geoJsonObject, options);
        this.eventsService.addEvents(map, layer, geoLand);

        return layer;
    };

    private getColor = (response: LifeIndexResponseType, score: number) => {
        const {diff, minValue} = this.prepareEdges(response);

        switch (true) {
            case score > minValue + diff / 2: return '#002080';
            case score > minValue + diff / 4: return '#002db3';
            case score > minValue + diff / 6: return '#0039e6';
            case score > minValue + diff / 8: return '#4d79ff';
            case score > minValue + diff / 10: return '#809fff';
            default:
                return '#b3c6ff';
        }
    };

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
