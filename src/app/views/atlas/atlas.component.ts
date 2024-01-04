import {Component, EventEmitter, Output} from '@angular/core';
import {GeoJSON, Layer, Map} from 'leaflet';

import {AtlasFilterService} from './sidebar-filter/atlas-filter/atlas-filter.service';
import {AtlasService} from './services/atlas.service';
import {LayersService} from './services/layers.service';
import {LocalService} from './services/local.service';

import {BASE_LAYER, LAYERS, MAP_OPTIONS} from './constants/atlas.const';

@Component({
    selector: 'app-atlas',
    templateUrl: './atlas.component.html',
    styleUrls: ['./atlas.component.scss']
})
export class AtlasComponent {
    constructor(
        private atlasFilterService: AtlasFilterService,
        private atlasService: AtlasService,
        private layersService: LayersService,
        private localService: LocalService
    ) {}

    private map: Map | undefined;
    protected readonly MAP_OPTIONS = MAP_OPTIONS;
    protected layers: (Layer | GeoJSON)[] = [BASE_LAYER];
    protected readonly layersControl = {
        baseLayers: {
            [LAYERS.OPEN_STREET_MAP.BASE.name]: LAYERS.OPEN_STREET_MAP.BASE.layer,
            [LAYERS.OPEN_STREET_MAP.CYCLE.name]: LAYERS.OPEN_STREET_MAP.CYCLE.layer,
            [LAYERS.OPEN_STREET_MAP.LAND.name]: LAYERS.OPEN_STREET_MAP.LAND.layer,
            [LAYERS.OPEN_STREET_MAP.TRANSPORT.name]: LAYERS.OPEN_STREET_MAP.TRANSPORT.layer
        },
        overlays: {
            // GeoJSON: this.layerGeoJSON
        }
    };

    @Output() openSidebar = new EventEmitter();

    onMapReady(map: Map) {
        this.map = map;
        this.atlasService.onFilterControlAdd(map);

        this.localService.lifeIndex$
            .subscribe(data => {
                if (this.layers.length > 1) {
                    this.layers = [BASE_LAYER];
                }

                this.layersService.onLayersReady(map, this.layers, data);
            });
    }

    onOpenSidebar(event: Event) {
        this.openSidebar.emit(event);
    }
}
