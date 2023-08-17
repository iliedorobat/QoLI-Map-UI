import {Component, Input} from '@angular/core';
import {NgbActiveOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {AtlasFilterType} from '../atlas/sidebar-filter/atlas-filter/atlas-filter.types';
import * as _ from 'lodash';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    constructor(
        public activeOffcanvas: NgbActiveOffcanvas
    ) {}

    @Input() filter: AtlasFilterType = new AtlasFilterType();
    @Input() onActiveButtonResets: Function = _.noop;

    onSidebarClose = () => {
        this.activeOffcanvas.dismiss('Cross click');
        this.onActiveButtonResets();
    };
}
