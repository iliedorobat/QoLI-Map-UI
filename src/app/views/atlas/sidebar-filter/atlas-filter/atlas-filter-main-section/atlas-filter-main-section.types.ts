import isNil from 'lodash-es/isNil';
import cloneDeep from 'lodash-es/cloneDeep';

import {
    AVAILABLE_INTERVAL,
    DEFAULT_YEAR
} from '@/app/shared/constants/app.const';
import {IQoLI} from '@/app/views/atlas/constants/qoli.types';
import {config} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter-main-section/temp.const';
// TODO: revisit:
// import * as config from '@/app/views/atlas/constants/qoli.config.json';

export interface IPrimaryAtlasFilter {
    // TODO: revisit: rename it to qoli???
    category: IQoLI;
    year: number;
    isDisabled: Function;
    isEmpty: Function;
    onDimensionChanges: Function;
    onIndicatorChanges: Function;
    someChecked: Function;
    // onCategoryChanges: Function;
    onYearChanges: Function;
    reset: Function;
}

/** @deprecated
 * TODO: revisit: remove
 */
export class PrimaryAtlasFilter implements IPrimaryAtlasFilter {
    public category;
    public year;

    constructor(category?: IQoLI, year?: number) {
        this.category = category ?? cloneDeep(config) as IQoLI;
        this.year = year ?? DEFAULT_YEAR;
    }

    public isDisabled(): boolean {
        // TODO:
        return isNil(this.category) || isNil(this.year);
    }

    public isEmpty(): boolean {
        // TODO:
        return isNil(this.category) && isNil(this.year);
    }

    public onDimensionChanges() {
        // TODO:
    }

    public onIndicatorChanges() {
        // TODO:
    }

    public someChecked() {
        // TODO:
    }

    // TODO: remove
    // public onCategoryChanges(index: number): void {
    //     this.category = Object.values(LIFE_INDEX_CATEGORIES)[index] as LIFE_INDEX_CATEGORIES;
    // }

    public onYearChanges(index: number): void {
        this.year = AVAILABLE_INTERVAL[index];
    }

    public reset(primary?: IPrimaryAtlasFilter): void {
        const {
            category = cloneDeep(config) as IQoLI,
            year = DEFAULT_YEAR
        } = primary || {};

        this.category = category;
        this.year = year;
    }
}
