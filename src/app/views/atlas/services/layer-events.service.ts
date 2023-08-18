import {Injectable} from '@angular/core';
import {GeoJSON, Map} from 'leaflet';

import {GeoFeature} from '../constants/geo.types';

@Injectable({
    providedIn: 'root'
})
export class LayerEventsService {
    public addEvents(map: Map, layer: GeoJSON, geoLand: GeoFeature) {
        this.onBindLayerName(layer, geoLand);
        this.onLayerMouseOver(layer);
        this.onLayerMouseOut(layer);
    }

    private onBindLayerName(layer: GeoJSON, geoLand: GeoFeature) {
        layer.bindPopup(myLayer => geoLand.properties.NAME_ENGL);
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
