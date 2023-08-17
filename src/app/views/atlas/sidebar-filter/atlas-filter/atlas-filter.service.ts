import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AtlasFilterType} from './atlas-filter.types';

@Injectable({
    providedIn: 'root',
})
export class AtlasFilterService {
    public initFilter = (filter: AtlasFilterType) => new FormGroup({
        category: new FormControl(filter.category, []),
        year: new FormControl(filter.category, [])
    });
}
