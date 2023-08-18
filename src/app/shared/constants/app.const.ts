const COPYRIGHT = {
    ORGANIZATION: {
        name: 'WebData',
        URI: 'http://webdata.ro/',
        URI_SSL: 'https://webdata.ro/'
    }
};

const ICONS = {
    CHECK: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    STANDARD: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'
};

enum LIFE_INDEX_ACCESSORS {
    QOLI = 'QOLI',
    EDUCATION = 'EDUCATION',
    ENVIRONMENT = 'ENVIRONMENT',
    GBR = 'GBR',
    HEALTH = 'HEALTH',
    SOC_INTERACTIONS = 'SOC_INTERACTIONS',
    LEISURE = 'LEISURE',
    MLC = 'MLC',
    OVERALL_EXP = 'OVERALL_EXP',
    PMA = 'PMA',
    SAFETY = 'SAFETY'
}

enum LIFE_INDEX_JSON_NAMES {
    QOLI = 'QoLI',
    EDUCATION = 'Education',
    ENVIRONMENT = 'Environment',
    GBR = 'GBR',
    HEALTH = 'Health',
    SOC_INTERACTIONS = 'Interactions',
    LEISURE = 'Leisure',
    MLC = 'MLC',
    OVERALL_EXP = 'Overall Exp',
    PMA = 'PMA',
    SAFETY = 'Safety'
}

export {
    COPYRIGHT,
    ICONS,
    LIFE_INDEX_ACCESSORS,
    LIFE_INDEX_JSON_NAMES
};
