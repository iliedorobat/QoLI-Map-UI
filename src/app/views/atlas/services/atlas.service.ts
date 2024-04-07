import {Injectable} from '@angular/core';
import {Control, DomUtil, geoJSON, Map} from 'leaflet';

import {AtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';
import {DatasetService} from '@/app/views/atlas/services/dataset.service';
import {GeoFeature} from '@/app/views/atlas/constants/geo.types';
import {IAtlasLayer} from '@/app/views/atlas/atlas.types';
import {LayerEventsService} from '@/app/views/atlas/services/layer-events.service';
import {LifeIndexResponse} from '@/app/views/atlas/constants/response.types';

import * as COUNTRIES_NON_EU from '@/../files/geo-location/europe-non-eu.json';
import * as COUNTRIES_EU from '@/../files/geo-location/europe-eu.json';
import {NON_EU28_MEMBER_CODES} from '@/app/shared/constants/app.const';
import {SORT_ORDER} from '@/app/shared/constants/math.const';

const FEATURES_NON_EU = (COUNTRIES_NON_EU?.features || []) as Array<GeoFeature>;
const FEATURES_EU = (COUNTRIES_EU?.features || []) as Array<GeoFeature>;
const FEATURES = [...FEATURES_NON_EU, ...FEATURES_EU] as Array<GeoFeature>;

@Injectable({
    providedIn: 'root'
})
export class AtlasService {
    constructor(
        private datasetService: DatasetService,
        private eventsService: LayerEventsService,
        private atlasFilter: AtlasFilter
    ) {}

    public onFilterControlAdd(map: Map): void {
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
    }

    public onToggleTooltip(layers: Array<IAtlasLayer>, response: LifeIndexResponse, showScore: boolean): void {
        this.eventsService.onToggleTooltip(layers, response, showScore);
    }

    public prepareLayers(map: Map, baseLayers: Array<IAtlasLayer>, response: LifeIndexResponse): Array<IAtlasLayer> {
        const countriesLayers = FEATURES.map(country => this.getFeatureLayer(map, country, response));

        return [...baseLayers, ...countriesLayers];
    }

    private getFeatureLayer(map: Map, geoLand: GeoFeature, response: LifeIndexResponse): IAtlasLayer {
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

        return {
            geoLand,
            value: layer
        } as IAtlasLayer;
    }

    private getColor(response: LifeIndexResponse, score: number, countryCode: string): string {
        const isNegativeState = this.atlasFilter.baseFilter.isIndividuallyAnalysis()
            && this.atlasFilter.individuallyFilter.isNegativeState()
        const sortedResponse = isNegativeState
            ? this.datasetService.getSortedResponse(response, SORT_ORDER.ASC)
            : this.datasetService.getSortedResponse(response, SORT_ORDER.DESC);
        const rank = sortedResponse.findIndex(item => item[0] === countryCode) + 1;
        const isExcluded = score === this.datasetService.EXCLUDED_COUNTRY_SCORE;

        switch (true) {
            case isExcluded: return '#838996';
            case rank <= 3: return '#001146';
            case rank <= 9: return '#00116e';
            case rank <= 15: return '#0011aa';
            case rank <= 18: return '#3753f2';
            case rank <= 21: return '#809fff';
            case rank <= 24: return '#fc7272';
            case rank <= 26: return '#fc4949';
            default: return '#e60000';
        }
    }

    private async getNonEuFeatures() {
        const worldFeatures = await import('@/../files/geo-location/world.json');

        return worldFeatures?.features?.filter(feature => NON_EU28_MEMBER_CODES.includes(feature.id)) || [];
    }
}

export const MARKERS_STATUS = {
    DISPLAY_ALL: 'all',
    DISPLAY_NONE: 'none',
    DISPLAY_FILTERED: 'filtered'
};
