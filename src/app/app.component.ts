import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'QoLI Map';

    onOpenSidebar(event: Event, buttonId: string) {
        console.log('app-root: onOpenSidebar:', event, buttonId);
    }
}
