// FIXME: revisit: remove the config
import * as config from './qoli.config.json';

export interface IQoLI {
    checked: boolean;
    filename: string;
    label: string;
    aggregators: IQoLIDimension[];
}

export interface IQoLIDimension {
    checked: boolean;
    filename: string;
    label: string;
    aggregators: IQoLIIndicator[];
}

export interface IQoLIIndicator {
    checked: boolean;
    filename: string;
    label: string;
}

const qoli: IQoLI = config as IQoLI;

export {qoli};
