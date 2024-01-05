import {PrimaryAtlasFilter, PrimaryAtlasFilterConstructor} from './atlas-filter-main-section/atlas-filter-main-section.types';

export interface AtlasFilter {
    primary: PrimaryAtlasFilter;
    isDisabled: Function;
    isEmpty: Function;
    reset: Function;
}

export class AtlasFilterConstructor implements AtlasFilter {
    public primary: PrimaryAtlasFilter;

    constructor(primary?: PrimaryAtlasFilter) {
        this.primary = primary ?? new PrimaryAtlasFilterConstructor();
    }

    public isDisabled(): boolean {
        return this.primary.isDisabled();
    }

    public isEmpty(): boolean {
        return this.primary.isEmpty();
    }

    public reset(memoizedFilter?: AtlasFilter): void {
        this.primary.reset(memoizedFilter?.primary);
    }
}
