/// <reference types="powerapps-component-framework" />
export interface IPeoplePickerProps {
    records: Record<string, ComponentFramework.PropertyHelper.DataSetApi.EntityRecord>;
    sortedRecordIds: string[];
    width?: number;
    height?: number;
    resolveDelay?: number;
    onChange: (newValue: any | undefined) => void;
}
