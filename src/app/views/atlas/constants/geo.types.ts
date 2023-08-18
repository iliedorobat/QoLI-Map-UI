import {Feature, Geometry} from 'geojson';

export interface GeoFeatureProperties {
    CAPT: string;
    CC_STAT: string;
    CNTR_ID: string;
    CNTR_NAME: string;
    EFTA_STAT: string;
    EU_STAT: string;
    FID: string;
    ISO3_CODE: string;
    NAME_ENGL: string;
    NAME_FREN: string;
    NAME_GERM: string;
    SVRG_UN: string;
}

export interface GeoFeature extends Feature<Geometry, GeoFeatureProperties> {}

export interface GeoCollection {
    type: string;
    features: Array<GeoFeature>;
    crs: {
        type: string,
        properties: {
            name: string
        }
    };
}
