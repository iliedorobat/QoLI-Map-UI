import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NgbActiveOffcanvas, NgbModal, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {AtlasFilterType} from './views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';
import {SidebarComponent} from './views/sidebar/sidebar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        public activeOffcanvas: NgbActiveOffcanvas,
        private modalService: NgbModal,
        private offcanvasService: NgbOffcanvas,
        private translate: TranslateService
    ) {
        translate.addLangs(['en-US']);
        translate.setDefaultLang('en-US');
        translate.use('en-US');
    }

    activeButtonId: string = 'map-button';
    atlasFilter: AtlasFilterType = new AtlasFilterType();
    title: string = 'QoLI Map';

    onOpenSidebar(event: Event, buttonId: string) {
        event.preventDefault();
        event.stopPropagation();

        this.onActiveButtonChanges(buttonId);

        const offcanvasRef = this.offcanvasService.open(SidebarComponent);
        offcanvasRef.componentInstance.filter = this.atlasFilter;
        offcanvasRef.componentInstance.name = 'Filter';
        offcanvasRef.componentInstance.onActiveButtonResets = this.onActiveButtonResets;
        offcanvasRef.hidden.subscribe(value => {
            this.onActiveButtonResets();
        });
    }

    onActiveButtonChanges = (buttonId: string) => {
        this.activeButtonId = buttonId;
    };

    onActiveButtonResets = () => {
        this.activeButtonId = 'map-button';
    };
}
