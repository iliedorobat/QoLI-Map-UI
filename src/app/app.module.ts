import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AtlasComponent} from './views/atlas/atlas.component';
import {
    AggregatedFilter,
    AggregatedFilterComponent,
    BaseFilter,
    BaseFilterComponent,
    IndividuallyFilterComponent,
    SidebarComponent,
    SidebarFilter
} from '@/app/views/sidebar';
import {AtlasService} from './views/atlas/services/atlas.service';
import {BackendService} from './views/atlas/services/backend.service';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgbActiveOffcanvas, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';

// AoT requires an exported function for factories: https://github.com/ngx-translate/core
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        AtlasComponent,
        SidebarComponent
    ],
    imports: [
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),

        AppRoutingModule,
        BrowserModule,
        LeafletModule,
        MatCheckboxModule,
        NgbModule,
        ReactiveFormsModule,

        AggregatedFilterComponent,
        BaseFilterComponent,
        IndividuallyFilterComponent
    ],
    providers: [
        AggregatedFilter,
        BaseFilter,
        AtlasService,
        BackendService,
        NgbActiveOffcanvas,
        SidebarFilter
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
