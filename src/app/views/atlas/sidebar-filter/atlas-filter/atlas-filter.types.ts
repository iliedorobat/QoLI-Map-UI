import {IPrimaryAtlasFilter, PrimaryAtlasFilter} from './atlas-filter-main-section/atlas-filter-main-section.types';

export interface IAtlasFilter {
    primary: IPrimaryAtlasFilter;
    isDisabled: Function;
    isEmpty: Function;
    reset: Function;
}

export class AtlasFilter implements IAtlasFilter {
    public primary: IPrimaryAtlasFilter;

    constructor(primary?: IPrimaryAtlasFilter) {
        this.primary = primary ?? new PrimaryAtlasFilter();
    }

    public isDisabled(): boolean {
        return this.primary.isDisabled();
    }

    public isEmpty(): boolean {
        return this.primary.isEmpty();
    }

    public reset(memoizedFilter?: IAtlasFilter): void {
        this.primary.reset(memoizedFilter?.primary);
    }
}
