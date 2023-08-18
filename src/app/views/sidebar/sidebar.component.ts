import {Component, Input} from '@angular/core';
import {NgbActiveOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

import {AtlasFilterService} from '../atlas/sidebar-filter/atlas-filter/atlas-filter.service';
import {AtlasFilterType} from '../atlas/sidebar-filter/atlas-filter/atlas-filter.types';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    constructor(
        public activeOffcanvas: NgbActiveOffcanvas,
        private atlasFilterService: AtlasFilterService
    ) {}

    @Input() filter: AtlasFilterType = this.atlasFilterService.initFilter();
    @Input() onActiveButtonResets: Function = _.noop;

    onSidebarClose = () => {
        this.activeOffcanvas.dismiss('Cross click');
        this.onActiveButtonResets();
    };
}
