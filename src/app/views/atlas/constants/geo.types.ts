import {Geometry} from 'geojson';

export interface GeoFeature {
    id: string;
    type: string;
    geometry: Geometry;
    properties: {
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
    };
}

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
