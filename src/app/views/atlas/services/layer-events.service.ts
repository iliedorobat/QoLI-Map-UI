import {Injectable} from '@angular/core';
import {GeoJSON, Map} from 'leaflet';

import {DatasetService} from '../services/dataset.service';
import {GeoFeature} from '../constants/geo.types';
import {IAtlasLayer} from '@/app/views/atlas/atlas.types';
import {LifeIndexResponse} from '../constants/response.types';
import {PopupService} from './popup.service';
import {TooltipService} from './tooltip.service';

@Injectable({
    providedIn: 'root'
})
export class LayerEventsService {
    constructor(
        private datasetService: DatasetService,
        private popupService: PopupService,
        private tooltipService: TooltipService
    ) {}

    public addEvents(map: Map, layer: GeoJSON, geoLand: GeoFeature, response: LifeIndexResponse) {
        this.onBindPopup(layer, geoLand, response);
        this.onBindTooltip(layer, geoLand, response);
        this.onLayerMouseOver(layer);
        this.onLayerMouseOut(layer);
    }

    public onToggleTooltip(layers: Array<IAtlasLayer>, response: LifeIndexResponse, showScore: boolean): void {
        if (showScore) {
            layers.forEach(layer => {
                if (layer.geoLand) {
                    this.onBindTooltip(layer.value as GeoJSON, layer.geoLand, response);
                }
            });
        } else {
            layers.forEach(layer => layer.value.unbindTooltip());
        }
    }

    private onBindPopup(layer: GeoJSON, geoLand: GeoFeature, response: LifeIndexResponse) {
        const options = this.popupService.getOptions();
        const content = this.popupService.createContent(geoLand, response);
        layer.bindPopup(content, options);
    }

    private onBindTooltip(layer: GeoJSON, geoLand: GeoFeature, response: LifeIndexResponse) {
        const score = this.datasetService.getScore(geoLand, response);

        // Avoid displaying the tooltip if the country has been filtered out
        if (score === this.datasetService.EXCLUDED_COUNTRY_SCORE) {
            return;
        }

        const options = this.tooltipService.getOptions(geoLand);
        const content = this.tooltipService.createContent(geoLand, response);

        layer.bindTooltip(content, options);
        layer.addEventListener(EVENT_TYPES.POPUP_CLOSE, () => {
            layer.bindTooltip(content, options);
        });
    }

    private onLayerMouseOver(layer: GeoJSON) {
        layer.addEventListener(EVENT_TYPES.MOUSE_OVER, () => {
            layer.setStyle({
                fillOpacity: 0.8,
                opacity: 1
            });
        });
    }

    private onLayerMouseOut(layer: GeoJSON) {
        layer.addEventListener(EVENT_TYPES.MOUSE_OUT, () => {
            layer.setStyle({
                fillOpacity: 0.6,
                opacity: 0.8
            });
        });
    }
}

export const EVENT_TYPES = {
    CLICK: 'click',
    MOUSE_OVER: 'mouseover',
    MOUSE_OUT: 'mouseout',
    POPUP_CLOSE: 'popupclose'
};
