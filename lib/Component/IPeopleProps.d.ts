/// <reference types="powerapps-component-framework" />
import { IInputs } from "./../generated/ManifestTypes";
export interface IPeopleProps {
    people?: any;
    preselectedpeople?: any;
    context?: ComponentFramework.Context<IInputs>;
    peopleList?: (newValue: any) => void;
    isPickerDisabled?: boolean;
    records: any;
}
