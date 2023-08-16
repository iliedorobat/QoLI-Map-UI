import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AtlasService {

}

export const MARKERS_STATUS = {
    DISPLAY_ALL: 'all',
    DISPLAY_NONE: 'none',
    DISPLAY_FILTERED: 'filtered'
};
