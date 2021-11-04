/// <reference types="powerapps-component-framework" />
import { IInputs, IOutputs } from "./generated/ManifestTypes";
export declare class PCFUIFabricPeoplePicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private theContainer;
    private notifyOutputChanged;
    private _context;
    container: HTMLDivElement;
    sortedRecordsIds: string[];
    records: {
        [id: string]: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord;
    };
    constructor();
    init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void;
    updateView(context: any): void;
    getOutputs(): IOutputs;
    destroy(): void;
}
