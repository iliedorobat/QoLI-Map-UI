import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LifeIndexFilterType} from '../../atlas/types/LifeIndexFilter.types';

@Injectable({
    providedIn: 'root',
})
export class GlobalFilterService {
    public initGlobalFilter = (filter: LifeIndexFilterType) => new FormGroup({
        category: new FormControl(filter.category, []),
        year: new FormControl(filter.category, [])
    });
}
