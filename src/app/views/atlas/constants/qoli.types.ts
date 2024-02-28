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
