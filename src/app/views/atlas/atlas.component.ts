import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {GeoJSON, Layer, Map} from 'leaflet';

import {AtlasService} from './services/atlas.service';
import {BackendService} from './services/backend.service';
import {Filter} from '@/app/shared/filter';
import {IAtlasLayer} from '@/app/views/atlas/atlas.types';

import {BASE_LAYERS, LAYERS, MAP_OPTIONS} from './constants/atlas.const';

@Component({
    selector: 'app-atlas',
    templateUrl: './atlas.component.html',
    styleUrls: ['./atlas.component.scss']
})
export class AtlasComponent implements OnInit, OnChanges {
    constructor(
        private atlasService: AtlasService,
        private backendService: BackendService,
        private filter: Filter,
    ) {}

    private map: Map | undefined;
    private scores = {};
    protected readonly MAP_OPTIONS = MAP_OPTIONS;
    protected atlasLayers: Array<IAtlasLayer> = BASE_LAYERS;
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

    @Input() showScore = true;
    @Output() openSidebar = new EventEmitter();

    get layers(): Array<Layer | GeoJSON> {
        return this.atlasLayers.map(atlasLayer => atlasLayer.value);
    }

    ngOnInit(): void {
        this.backendService.lifeIndex$
            .subscribe(scores => {
                if (this.map) {
                    // TODO: prepareLifeIndex
                    this.scores = this.backendService.prepareLifeIndex(scores, this.filter.baseFilter.startYear);
                    this.atlasLayers = this.atlasService.prepareLayers(this.map, BASE_LAYERS, this.scores);
                }
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.atlasService.onToggleTooltip(this.atlasLayers, this.scores, this.showScore);
    }

    onMapReady(map: Map): void {
        this.map = map;
        this.atlasService.onFilterControlAdd(map);
    }

    onOpenSidebar(event: Event): void {
        this.openSidebar.emit(event);
    }
}
