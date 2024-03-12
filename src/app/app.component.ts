import {Component} from '@angular/core';
import {Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';

import {AtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';
import {BackendService} from '@/app/views/atlas/services/backend.service';
import {MenuItem} from '@/app/app.types';
import {SidebarComponent} from './views/sidebar/sidebar.component';

import {DEFAULT_ACTIVE_MENU_ITEM_ID, MENU_ITEMS, MENU_ITEMS_IDS} from './app.const';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private _showScore$ = new Subject();
    private showScore$$ = this._showScore$.asObservable();

    protected readonly MENU_ITEMS: Array<MenuItem> = MENU_ITEMS;
    protected readonly MENU_ITEMS_IDS = MENU_ITEMS_IDS;
    protected activeMenuItemId: string = DEFAULT_ACTIVE_MENU_ITEM_ID;
    protected showScore: boolean = true;

    constructor(
        private atlasFilter: AtlasFilter,
        private backendService: BackendService,
        private modalService: NgbModal,
        private offcanvasService: NgbOffcanvas,
        private translate: TranslateService
    ) {
        translate.addLangs(['en-US']);
        translate.setDefaultLang('en-US');
        translate.use('en-US');

        backendService.lifeIndexSubscription(this.atlasFilter);

        this.showScore$$.subscribe(showScore => {
            this.showScore = showScore as boolean;
        });
    }

    onMenuItemClick(event: Event, menuItem: MenuItem): void {
        const {id} = menuItem;
        if (id === this.MENU_ITEMS_IDS.LOGO) {
            return;
        }

        if (id === this.MENU_ITEMS_IDS.FILTER) {
            this.onOpenSidebar(event, id);
        } else {
            this.onActiveButtonChange(id);
        }
    }

    onOpenSidebar(event: Event, itemId: string): void {
        event.preventDefault();
        event.stopPropagation();

        this.onActiveButtonChange(itemId);

        const offcanvasRef = this.offcanvasService.open(SidebarComponent);
        offcanvasRef.componentInstance.name = 'Filter';
        offcanvasRef.componentInstance.onActiveButtonResets = this.onActiveButtonReset;
        offcanvasRef.componentInstance.onToggleScore = this.onToggleScore;
        offcanvasRef.hidden.subscribe(value => {
            this.onActiveButtonReset();
        });
    }

    onActiveButtonChange(itemId: string): void {
        this.activeMenuItemId = itemId;
    }

    onActiveButtonReset(): void {
        this.activeMenuItemId = DEFAULT_ACTIVE_MENU_ITEM_ID;
    }

    onToggleScore = (showScore?: boolean) => {
        const newShowScore = showScore || !this.showScore;
        this._showScore$.next(newShowScore);
    }
}
