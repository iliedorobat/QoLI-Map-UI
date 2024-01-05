import {Injectable} from '@angular/core';
import {Control, DomUtil, geoJSON, GeoJSON, Layer, Map} from 'leaflet';

import {DatasetService} from '@/app/views/atlas/services/dataset.service';
import {GeoFeature} from '@/app/views/atlas/constants/geo.types';
import {LayerEventsService} from '@/app/views/atlas/services/layer-events.service';
import {LifeIndexResponse} from '@/app/views/atlas/constants/response.types';

import * as COUNTRIES from '@/../files/geo-location/european-union.json';
import {SORT_ORDER} from '@/app/shared/constants/math.const';

const FEATURES = (COUNTRIES?.features || []) as Array<GeoFeature>;

@Injectable({
    providedIn: 'root'
})
export class AtlasService {
    constructor(
        private eventsService: LayerEventsService,
        private datasetService: DatasetService,
    ) {}

    onFilterControlAdd = (map: Map): void => {
        const CustomControl = Control.extend({
            onAdd(map: Map) {
                return DomUtil.get('filter-controller');
            },
            onRemove(map: Map) {}
        });
        const custom = new CustomControl({
            position: 'topleft'
        });
        map.addControl(custom);
    };

    prepareLayers = (map: Map, baseLayers: Array<Layer | GeoJSON>, response: LifeIndexResponse): Array<Layer | GeoJSON> => {
        const countriesLayers = FEATURES.map(county => this.getFeatureLayer(map, county, response));

        return [...baseLayers, ...countriesLayers];
    };

    private getFeatureLayer = (map: Map, geoLand: GeoFeature, response: LifeIndexResponse): GeoJSON => {
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

    private getColor = (response: LifeIndexResponse, score: number, countryCode: string): string => {
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
}

export const MARKERS_STATUS = {
    DISPLAY_ALL: 'all',
    DISPLAY_NONE: 'none',
    DISPLAY_FILTERED: 'filtered'
};
