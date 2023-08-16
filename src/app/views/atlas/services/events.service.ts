import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EventsService {

}

export const EVENTS_TYPE = {
    CLICK: 'click',
    MOUSE_OVER: 'mouseover',
    MOUSE_OUT: 'mouseout'
};
