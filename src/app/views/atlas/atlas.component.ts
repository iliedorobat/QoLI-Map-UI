import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {Control, DomUtil, GeoJSON, Layer, Map} from 'leaflet';

import {AtlasService} from './services/atlas.service';
import {EventsService} from './services/events.service';
import {LayersService} from './services/layers.service';

import {BASE_LAYER, LAYERS, MAP_OPTIONS} from './constants/atlas.const';

@Component({
  selector: 'app-atlas',
  templateUrl: './atlas.component.html',
  styleUrls: ['./atlas.component.scss']
})
export class AtlasComponent {
    constructor(
        private atlasService: AtlasService,
        private changeDetector: ChangeDetectorRef,
        private eventsService: EventsService,
        private layersService: LayersService
    ) {}

    MAP_OPTIONS = MAP_OPTIONS;
    private map: Map | undefined;
    layers: (Layer | GeoJSON)[] = [BASE_LAYER];
    layersControl = {
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
        this.layersService.onLayersReady(map, this.layers);
    }

    onOpenSidebar(event: Event) {
        this.openSidebar.emit(event);
    }

    // ngOnDestroy(): void {
    //   this.destroying$.next();
    //   this.destroying$.complete();
    // }
}
