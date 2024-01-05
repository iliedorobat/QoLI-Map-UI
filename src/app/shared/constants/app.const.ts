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

const LIFE_INDEX_START = 2004;

const LIFE_INDEX_END = 2022;

const LIFE_INDEX_INTERVAL = (
    () => {
        const values = [];

        for (let year = LIFE_INDEX_START; year <= LIFE_INDEX_END; year++) {
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
    COPYRIGHT,
    ICONS,
    LIFE_INDEX_CATEGORIES,
    LIFE_INDEX_END,
    LIFE_INDEX_INTERVAL,
    LIFE_INDEX_LABELS,
    LIFE_INDEX_JSON_NAMES,
    LIFE_INDEX_START
};
