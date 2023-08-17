import {Injectable} from '@angular/core';
import {Control, DomUtil, Map} from 'leaflet';

@Injectable({
    providedIn: 'root'
})
export class AtlasService {
    onFilterControlAdd(map: Map) {
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
}

export const MARKERS_STATUS = {
    DISPLAY_ALL: 'all',
    DISPLAY_NONE: 'none',
    DISPLAY_FILTERED: 'filtered'
};
