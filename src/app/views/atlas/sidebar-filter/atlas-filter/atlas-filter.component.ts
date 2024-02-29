import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import noop from 'lodash-es/noop';
import get from 'lodash-es/get';

import {AtlasFilterMainSectionComponent} from '../atlas-filter/atlas-filter-main-section/atlas-filter-main-section.component';
import {AtlasFilterService} from './atlas-filter.service';
import {BackendService} from '@/app/views/atlas/services/backend.service';
import {IAtlasFilter} from './atlas-filter.types';

@Component({
    selector: 'app-atlas-filter',
    templateUrl: './atlas-filter.component.html',
    styleUrls: ['./atlas-filter.component.scss']
})
export class AtlasFilterComponent implements AfterViewInit {
    constructor(
        private atlasFilterService: AtlasFilterService,
        private backendService: BackendService
    ) {}

    @ViewChild(AtlasFilterMainSectionComponent) child: AtlasFilterMainSectionComponent | undefined;
    @Input() onActiveButtonResets: Function = noop;

    protected filter: IAtlasFilter = this.atlasFilterService.getFilter();
    protected form: FormGroup = this.filter.initForm();
    protected headerLabel = 'Results: 0 countries';

    ngAfterViewInit(): void {
        // ERROR Error: NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
        // https://blog.angular-university.io/angular-debugging/
        setTimeout(() => {
            const counter = this.child?.getSelectedCountries()?.length || 0;
            this.headerLabel = `Results: ${counter} countries`
        }, 0);
    }

    onFilterApply(): void {
        this.filter.saveFilter(this.form);
        this.backendService.lifeIndexSubscription(this.filter);
    }

    onSectionReset(event: Event): void {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const value = get(target, ['offsetParent', 'attributes', 'aria-controls', 'value']);

        switch (value) {
            case 'atlas-filter-main-section':
                this.filter.baseFilter.resetForm(this.form);
                this.child?.resetSelectedItems();
                break;
            default:
                break;
        }
    }

    onReset(): void {
        this.filter.resetForm(this.form);
        this.child?.resetSelectedItems();
    }

    onSubmit(): void {
        this.onFilterApply();
    }
}
