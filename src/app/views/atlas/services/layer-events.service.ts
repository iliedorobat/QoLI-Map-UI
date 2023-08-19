import {Injectable} from '@angular/core';
import {GeoJSON, Map, PointTuple, PopupOptions} from 'leaflet';

import {GeoFeature} from '../constants/geo.types';
import {LifeIndexResponseType} from '../constants/response.type';
import {PopupService} from './popup.service';

@Injectable({
    providedIn: 'root'
})
export class LayerEventsService {
    constructor(private popupService: PopupService) {}

    public addEvents(map: Map, layer: GeoJSON, geoLand: GeoFeature, response: LifeIndexResponseType) {
        this.onBindLayerName(layer, geoLand, response);
        this.onLayerMouseOver(layer);
        this.onLayerMouseOut(layer);
    }

    private onBindLayerName(layer: GeoJSON, geoLand: GeoFeature, response: LifeIndexResponseType) {
        const options = {
            className: 'land-summary',
            offset: [0, -31] as PointTuple
        } as PopupOptions;

        const content = this.popupService.createPopupContent(geoLand, response);
        layer.bindPopup(content, options);
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
    MOUSE_OUT: 'mouseout'
};
