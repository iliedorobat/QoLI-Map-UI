import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AtlasComponent} from './views/atlas/atlas.component';
import {AtlasService} from './views/atlas/atlas.service';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

@NgModule({
    declarations: [
        AppComponent,
        AtlasComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        LeafletModule
    ],
    providers: [
        AtlasService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
