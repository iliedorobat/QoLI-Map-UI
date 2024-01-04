import {Injectable} from '@angular/core';
import {GeoJSON, Map} from 'leaflet';

import {GeoFeature} from '../constants/geo.types';
import {LifeIndexResponse} from '../constants/response.types';
import {PopupService} from './popup.service';
import {TooltipService} from './tooltip.service';

@Injectable({
    providedIn: 'root'
})
export class LayerEventsService {
    constructor(
        private popupService: PopupService,
        private tooltipService: TooltipService
    ) {}

    public addEvents(map: Map, layer: GeoJSON, geoLand: GeoFeature, response: LifeIndexResponse) {
        this.onBindPopup(layer, geoLand, response);
        this.onBindTooltip(layer, geoLand, response);
        this.onLayerMouseOver(layer);
        this.onLayerMouseOut(layer);
    }

    private onBindPopup(layer: GeoJSON, geoLand: GeoFeature, response: LifeIndexResponse) {
        const options = this.popupService.getOptions();
        const content = this.popupService.createContent(geoLand, response);
        layer.bindPopup(content, options);
    }

    private onBindTooltip(layer: GeoJSON, geoLand: GeoFeature, response: LifeIndexResponse) {
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
