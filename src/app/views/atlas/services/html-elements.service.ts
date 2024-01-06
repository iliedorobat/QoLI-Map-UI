import {Injectable} from '@angular/core';

export type HTMLElementParams = {
    className?: string;
    innerText?: string;
    tagName: string;
};

@Injectable({
    providedIn: 'root'
})
export class HtmlElementsService {
    public createElement(params: HTMLElementParams): HTMLElement {
        const {className, innerText, tagName} = params;
        const element = document.createElement(tagName);

        if (innerText) {
            element.innerText = innerText as string;
        }

        if (className) {
            element.className = className;
        }

        return element;
    }

    public createLabelElement(label: string): HTMLElement {
        return this.createElement({
            className: 'label',
            innerText: `${label}:`,
            tagName: 'div'
        } as HTMLElementParams);
    }

    public createValueElement(value: string | number | null): HTMLElement {
        return this.createElement({
            className: 'value',
            innerText: value,
            tagName: 'div'
        } as HTMLElementParams);
    }
}
