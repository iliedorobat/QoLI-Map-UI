import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GeoJSON, Layer, Map} from 'leaflet';

import {AtlasService} from './services/atlas.service';
import {BackendService} from './services/backend.service';

import {BASE_LAYER, LAYERS, MAP_OPTIONS} from './constants/atlas.const';

@Component({
    selector: 'app-atlas',
    templateUrl: './atlas.component.html',
    styleUrls: ['./atlas.component.scss']
})
export class AtlasComponent implements OnInit {
    constructor(
        private atlasService: AtlasService,
        private backendService: BackendService
    ) {}

    private map: Map | undefined;
    protected readonly MAP_OPTIONS = MAP_OPTIONS;
    protected layers: Array<Layer | GeoJSON> = [BASE_LAYER];
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

    ngOnInit(): void {
        this.backendService.lifeIndex$
            .subscribe(data => {
                if (this.map) {
                    const baseLayers = [BASE_LAYER];
                    this.layers = this.atlasService.prepareLayers(this.map, baseLayers, data);
                }
            });
    }

    onMapReady(map: Map): void {
        this.map = map;
        this.atlasService.onFilterControlAdd(map);
    }

    onOpenSidebar(event: Event): void {
        this.openSidebar.emit(event);
    }
}
