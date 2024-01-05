import {PrimaryAtlasFilter, PrimaryAtlasFilterConstructor} from './atlas-filter-main-section/atlas-filter-main-section.types';

export interface AtlasFilter {
    primary: PrimaryAtlasFilter;
    isDisabled: Function;
    isEmpty: Function;
}

export class AtlasFilterConstructor implements AtlasFilter {
    public primary: PrimaryAtlasFilter;

    constructor(primary?: PrimaryAtlasFilter) {
        this.primary = primary ?? new PrimaryAtlasFilterConstructor();
    }

    public isDisabled() {
        return this.primary.isDisabled();
    }

    public isEmpty() {
        return this.primary.isEmpty();
    }
}
