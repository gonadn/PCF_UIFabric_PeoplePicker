/// <reference types="powerapps-component-framework" />
/// <reference types="react" />
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { IInputs } from "./generated/ManifestTypes";
export interface IPeoplePersona {
    text?: string;
    secondaryText?: string;
}
export interface IPeopleProps {
    people?: any;
    preselectedpeople?: any;
    context?: ComponentFramework.Context<IInputs>;
    peopleList?: (newValue: any) => void;
    isPickerDisabled?: boolean;
}
export interface IPeoplePickerState {
    currentPicker?: number | string;
    delayResults?: boolean;
    peopleList: IPersonaProps[];
    mostRecentlyUsed: IPersonaProps[];
    currentSelectedItems?: IPersonaProps[];
}
export declare class PeoplePickerTypes extends BaseComponent<any, IPeoplePickerState> {
    private _picker;
    constructor(props: IPeopleProps);
    render(): JSX.Element;
    private handleChange;
    private _onItemSelected;
    private getPeopleRelatedVal;
    private _getTextFromItem;
    private _onRemoveSuggestion;
    private _onFilterChanged;
    private _searchUsers;
    private _returnMostRecentlyUsed;
    private _filterPromise;
    private _listContainsPersona;
    private _filterPersonasByText;
    private _doesTextStartWith;
    private _convertResultsToPromise;
    private _removeDuplicates;
    private _validateInput;
    /**
     * Takes in the picker input and modifies it in whichever way
     * the caller wants, i.e. parsing entries copied from Outlook (sample
     * input: "Aaron Reid <aaron>").
     *
     * @param input The text entered into the picker.
     */
    private _onInputChange;
}
