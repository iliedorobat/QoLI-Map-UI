import {Component, Input} from '@angular/core';
import {NgbActiveOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {LifeIndexFilterType} from '../atlas/types/LifeIndexFilter.types';
import * as _ from 'lodash';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    constructor(
        public activeOffcanvas: NgbActiveOffcanvas
    ) {}

    @Input() filter: LifeIndexFilterType = new LifeIndexFilterType();
    @Input() onActiveButtonResets: Function = _.noop;

    onSidebarClose = () => {
        this.activeOffcanvas.dismiss('Cross click');
        this.onActiveButtonResets();
    };
}
