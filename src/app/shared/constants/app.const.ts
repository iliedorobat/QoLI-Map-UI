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

export {
    AVAILABLE_INTERVAL,
    COPYRIGHT,
    DEFAULT_YEAR,
    ICONS,
    MAX_YEAR,
    MIN_YEAR
};
