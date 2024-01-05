import {Component, Input} from '@angular/core';
import {NgbActiveOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import noop from 'lodash-es/noop';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    constructor(
        public activeOffcanvas: NgbActiveOffcanvas
    ) {}

    @Input() onActiveButtonResets: Function = noop;

    onSidebarClose(): void {
        this.activeOffcanvas.dismiss('Cross click');
        this.onActiveButtonResets();
    }
}
