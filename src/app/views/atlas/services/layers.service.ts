import {Injectable} from '@angular/core';
import {GeoJSON, geoJSON, Layer, Map} from 'leaflet';
import * as _ from 'lodash';

import {GeoFeature} from '../constants/geo.types';
import {LayerEventsService} from './layer-events.service';
import * as COUNTRIES from '../../../../../files/geo-location/european-union.json';

const FEATURES = _.get(COUNTRIES, 'features', []) as Array<GeoFeature>;

@Injectable({
    providedIn: 'root',
})
export class LayersService {
    constructor(
        public eventsService: LayerEventsService
    ) {}

    onLayersReady(map: Map, layers: (Layer | GeoJSON)[]) {
        const countriesLayers = FEATURES.map(county => this.getFeatureLayer(map, county));
        layers.push(...countriesLayers);
    }

    public getFeatureLayer = (map: Map, geoLand: GeoFeature) => {
        const geoJsonObject = geoLand.geometry;
        // const counter = entitiesSummaries.filter(entity => entity.county === geoLand.properties.name).length;
        const options = {
            style: () => ({
                // FIXME:
                // color: this.getColor(geoLand.properties.stats),
                // fillColor: this.getColor(geoLand.properties.stats),
                fillOpacity: 0.6,
                opacity: 0.8,
                weight: 3
            })
        };

        const layer = geoJSON(geoJsonObject, options);
        this.eventsService.addEvents(map, layer, geoLand);

        return layer;
    };

    private getColor = (stats: object) => {
        // TODO:
        const value = _.get(stats, ['museums', 0, 'total']) || 0;

        switch (true) {
            case value > 50: return '#002080';
            case value > 40: return '#002db3';
            case value > 30: return '#0039e6';
            case value > 20: return '#1a53ff';
            case value > 10: return '#4d79ff';
            case value > 5: return '#809fff';
            case value > 1: return '#b3c6ff';
            default: return '#e6ecff';
        }
    };
}
