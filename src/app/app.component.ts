import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';

import {AtlasFilterService} from './views/atlas/sidebar-filter/atlas-filter/atlas-filter.service';
import {LocalService} from './views/atlas/services/local.service';
import {MenuItem} from '@/app/app.types';
import {SidebarComponent} from './views/sidebar/sidebar.component';

import {DEFAULT_ACTIVE_MENU_ITEM_ID, MENU_ITEMS, MENU_ITEMS_IDS} from './app.const';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    protected readonly MENU_ITEMS: Array<MenuItem> = MENU_ITEMS;
    protected readonly MENU_ITEMS_IDS = MENU_ITEMS_IDS;
    protected activeMenuItemId: string = DEFAULT_ACTIVE_MENU_ITEM_ID;

    constructor(
        private atlasFilterService: AtlasFilterService,
        private localService: LocalService,
        private modalService: NgbModal,
        private offcanvasService: NgbOffcanvas,
        private translate: TranslateService
    ) {
        translate.addLangs(['en-US']);
        translate.setDefaultLang('en-US');
        translate.use('en-US');

        localService.lifeIndexSubscription(this.atlasFilterService.getFilter());
    }

    onMenuItemClick = (event: Event, menuItem: MenuItem) => {
        const {id} = menuItem;
        if (id === this.MENU_ITEMS_IDS.LOGO) {
            return;
        }

        if (id === this.MENU_ITEMS_IDS.FILTER) {
            this.onOpenSidebar(event, id);
        } else {
            this.onActiveButtonChange(id);
        }
    };

    onOpenSidebar(event: Event, itemId: string) {
        event.preventDefault();
        event.stopPropagation();

        this.onActiveButtonChange(itemId);

        const offcanvasRef = this.offcanvasService.open(SidebarComponent);
        offcanvasRef.componentInstance.name = 'Filter';
        offcanvasRef.componentInstance.onActiveButtonResets = this.onActiveButtonReset;
        offcanvasRef.hidden.subscribe(value => {
            this.onActiveButtonReset();
        });
    }

    onActiveButtonChange = (itemId: string) => {
        this.activeMenuItemId = itemId;
    };

    onActiveButtonReset = () => {
        this.activeMenuItemId = DEFAULT_ACTIVE_MENU_ITEM_ID;
    };
}
