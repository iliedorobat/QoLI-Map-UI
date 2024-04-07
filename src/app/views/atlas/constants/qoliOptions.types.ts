export interface IAggrQoLI {
    checked: boolean;
    filename: string;
    label: string;
    aggregators: IAggrQoLIDimension[];
}

export interface IAggrQoLIDimension {
    checked: boolean;
    filename: string;
    label: string;
    aggregators: IAggrQoLIIndicator[];
}

export interface IAggrQoLIIndicator {
    checked: boolean;
    filename: string;
    label: string;
    negativeState: boolean;
    units: string;
}
