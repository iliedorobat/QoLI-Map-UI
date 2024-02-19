import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AtlasComponent} from './views/atlas/atlas.component';
import {AtlasFilterComponent} from './views/atlas/sidebar-filter/atlas-filter/atlas-filter.component';
import {AtlasFilterMainSectionComponent} from './views/atlas/sidebar-filter/atlas-filter/atlas-filter-main-section/atlas-filter-main-section.component';
import {AtlasService} from './views/atlas/services/atlas.service';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgbActiveOffcanvas, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {SidebarComponent} from './views/sidebar/sidebar.component';

// AoT requires an exported function for factories: https://github.com/ngx-translate/core
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        AtlasComponent,
        AtlasFilterComponent,
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
        NgbModule,
        ReactiveFormsModule,
        AtlasFilterMainSectionComponent
    ],
    providers: [
        AtlasService,
        NgbActiveOffcanvas
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
