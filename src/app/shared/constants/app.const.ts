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

const DEFAULT_YEAR = 2021;

const MIN_YEAR = 2004;

const MAX_YEAR = 2022;

const AVAILABLE_INTERVAL = (
    () => {
        const values = [];

        for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
            values.push(year);
        }

        return values;
    }
)();

enum LIFE_INDEX_CATEGORIES {
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

enum LIFE_INDEX_LABELS {
    QOLI = 'Quality of Life Index',
    EDUCATION = 'Education',
    ENVIRONMENT = 'Environment',
    GBR = 'Government and Basic Rights',
    HEALTH = 'Health',
    SOC_INTERACTIONS = 'Social Interactions',
    LEISURE = 'Leisure',
    MLC = 'Material and Living Conditions',
    OVERALL_EXP = 'Overall Experience',
    PMA = 'Productive or Main Activity',
    SAFETY = 'Safety'
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
    AVAILABLE_INTERVAL,
    COPYRIGHT,
    DEFAULT_YEAR,
    ICONS,
    LIFE_INDEX_CATEGORIES,
    LIFE_INDEX_LABELS,
    LIFE_INDEX_JSON_NAMES,
    MAX_YEAR,
    MIN_YEAR
};
