import {Component} from '@angular/core';

@Component({
    selector: 'qoli-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'QoLI Map';

    onOpenSidebar(event: Event, buttonId: string) {
        console.log('qoli-root: onOpenSidebar:', event, buttonId);
    }
}
