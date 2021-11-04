/// <reference types="powerapps-component-framework" />
import * as React from 'react';
export interface PeoplePickerProps {
    records: Record<string, ComponentFramework.PropertyHelper.DataSetApi.EntityRecord>;
    sortedRecordIds: string[];
    width?: number;
    height?: number;
}
export declare const PeoplePickerNormal: React.MemoExoticComponent<(props: PeoplePickerProps) => JSX.Element>;
