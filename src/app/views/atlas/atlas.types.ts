import {GeoJSON, Layer} from 'leaflet';
import {GeoFeature} from './constants/geo.types';

export interface IAtlasLayer {
    value: Layer | GeoJSON;
    geoLand?: GeoFeature;
}
