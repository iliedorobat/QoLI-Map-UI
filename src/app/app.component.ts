import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NgbActiveOffcanvas, NgbModal, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';

import {AtlasFilterService} from './views/atlas/sidebar-filter/atlas-filter/atlas-filter.service';
import {AtlasFilterType} from './views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';
import {LocalService} from './views/atlas/services/local.service';
import {SidebarComponent} from './views/sidebar/sidebar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    activeButtonId: string = 'map-button';
    atlasFilter: AtlasFilterType = this.atlasFilterService.initFilter();
    title: string = 'QoLI Map';

    constructor(
        public activeOffcanvas: NgbActiveOffcanvas,
        private atlasFilterService: AtlasFilterService,
        private localService: LocalService,
        private modalService: NgbModal,
        private offcanvasService: NgbOffcanvas,
        private translate: TranslateService
    ) {
        translate.addLangs(['en-US']);
        translate.setDefaultLang('en-US');
        translate.use('en-US');

        localService.getLifeIndex(this.atlasFilter)
            .subscribe(data => {
                console.log('AppComponent:', data);
            });
        // localService.lifeIndex$
        //     .subscribe(data => {
        //         console.log('localService.lifeIndex$:', data);
        //     });
    }

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
