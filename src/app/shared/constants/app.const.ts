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


const MIN_YEAR = 2004;
const MAX_YEAR = 2022;
const DEFAULT_YEAR = MAX_YEAR;

const AVAILABLE_INTERVAL = (
    () => {
        const values = [];

        for (let year = MAX_YEAR; year >= MIN_YEAR; year--) {
            values.push(year);
        }

        return values;
    }
)();

const EU28_MEMBERS = {
    // EU: 'European Union', // (EU6-1958, EU9-1973, EU10-1981, EU12-1986, EU15-1995, EU25-2004, EU27-2007, EU28-2013, EU27-2020)
    // EU27_2020: 'European Union - 27 countries', // (from 2020)
    // EU28: 'European Union - 28 countries', // (2013-2020)
    AT: 'Austria',
    BE: 'Belgium',
    BG: 'Bulgaria',
    CY: 'Cyprus',
    CZ: 'Czech Republic',
    DE: 'Germany', // Germany (until 1990 former territory of the FRG)
    DK: 'Denmark',
    EE: 'Estonia',
    EL: 'Greece',
    ES: 'Spain',
    FI: 'Finland',
    FR: 'France',
    HR: 'Croatia',
    HU: 'Hungary',
    IE: 'Ireland',
    IT: 'Italy',
    LT: 'Lithuania',
    LU: 'Luxembourg',
    LV: 'Latvia',
    MT: 'Malta',
    NL: 'Netherlands',
    PL: 'Poland',
    PT: 'Portugal',
    RO: 'Romania',
    SE: 'Sweden',
    SI: 'Slovenia',
    SK: 'Slovakia',
    UK: 'United Kingdom',
} as const;

const EU28_MEMBER_CODES = Object.keys(EU28_MEMBERS);

export {
    AVAILABLE_INTERVAL,
    COPYRIGHT,
    DEFAULT_YEAR,
    EU28_MEMBERS,
    EU28_MEMBER_CODES,
    ICONS,
    MAX_YEAR,
    MIN_YEAR
};
