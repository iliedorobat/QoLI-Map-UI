import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import {IIndividuallyQoLIIndicator} from '@/app/views/atlas/constants/qoliBaseOptions.types';
import {SidebarFilter} from '@/app/views/sidebar';

@Component({
    selector: 'app-atlas-individually-filter',
    templateUrl: './individually-filter.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule
    ]
})
export class IndividuallyFilterComponent {
    constructor(
        protected sidebarFilter: SidebarFilter
    ) {}

    onSelectIndicator(indicator: IIndividuallyQoLIIndicator) {
        this.sidebarFilter.individuallyFilter.unsavedIndicator = indicator;
    }
}
