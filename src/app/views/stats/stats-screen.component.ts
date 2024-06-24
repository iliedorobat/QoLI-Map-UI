import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import noop from 'lodash-es/noop';

@Component({
    selector: 'app-stats-screen',
    templateUrl: './stats-screen.component.html',
    standalone: true,
    styleUrls: ['./stats-screen.component.scss'] // TODO:
})
export class StatsScreenComponent {
    constructor(
        public activeModal: NgbActiveModal,
    ) {}

    @Input() onActiveButtonReset: Function = noop;

    onViewClose = () => {
        this.activeModal.close();
        this.onActiveButtonReset();
    };
}
