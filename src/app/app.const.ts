import {MenuItem} from '@/app/app.types';

const MENU_ITEMS_IDS = {
    FILTER: 'filter-button',
    LOGO: 'logo-button',
    MAP: 'map-button',
};

const MENU_ITEMS = [
    {
        id: MENU_ITEMS_IDS.FILTER,
        iconClasses: 'fa-solid fa-filter',
        label: 'Filter',
        order: 2
    },
    {
        id: MENU_ITEMS_IDS.LOGO,
        label: 'Quality of Life Index Map',
        order: 0
    },
    {
        id: MENU_ITEMS_IDS.MAP,
        iconClasses: 'fa-solid fa-map-location-dot',
        label: 'Map',
        order: 1
    },
].sort((a: MenuItem, b: MenuItem) => {
    if (a.order > b.order) {
        return 1;
    } else if (a.order < b.order) {
        return -1;
    }
    return 0;
});

const DEFAULT_ACTIVE_MENU_ITEM_ID = MENU_ITEMS_IDS.MAP;

export {
    DEFAULT_ACTIVE_MENU_ITEM_ID,
    MENU_ITEMS,
    MENU_ITEMS_IDS,
};
