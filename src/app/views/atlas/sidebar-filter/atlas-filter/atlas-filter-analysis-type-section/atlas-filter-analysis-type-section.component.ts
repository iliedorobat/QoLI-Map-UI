import {Component} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

import {AtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';
import {ANALYSIS_TYPE, ANALYSIS_TYPE_LABELS} from '@/app/shared/constants/app.const';

@Component({
    selector: 'app-atlas-filter-analysis-type-section',
    templateUrl: './atlas-filter-analysis-type-section.component.html',
    styleUrls: ['./atlas-filter-analysis-type-section.component.scss'],
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
    standalone: true
})
export class AtlasFilterAnalysisTypeSectionComponent {
    constructor(
        protected atlasFilter: AtlasFilter
    ) {}

    protected readonly ANALYSIS_TYPE_LABELS = ANALYSIS_TYPE_LABELS;
    protected readonly ANALYSIS_TYPES = Object.values(ANALYSIS_TYPE);
}
