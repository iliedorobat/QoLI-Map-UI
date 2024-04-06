import {Component} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import {AtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';
import {IQoLIOptionsIndicator} from '@/app/views/atlas/constants/qoliOptions.types';

@Component({
    selector: 'app-atlas-individually-filter',
    templateUrl: './atlas-individually-filter.component.html',
    standalone: true,
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule
    ]
})
export class AtlasIndividuallyFilterComponent {
    constructor(
        protected atlasFilter: AtlasFilter
    ) {}

    onSelectIndicator(indicator: IQoLIOptionsIndicator) {
        this.atlasFilter.individuallyFilter.unsavedIndicator = indicator;
    }
}
