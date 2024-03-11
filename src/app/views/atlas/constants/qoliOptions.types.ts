export interface IQoLIOptions {
    checked: boolean;
    filename: string;
    label: string;
    aggregators: IQoLIOptionsDimension[];
}

export interface IQoLIOptionsDimension {
    checked: boolean;
    filename: string;
    label: string;
    aggregators: IQoLIOptionsIndicator[];
}

export interface IQoLIOptionsIndicator {
    checked: boolean;
    filename: string;
    label: string;
}
