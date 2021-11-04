import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
export interface IPeoplePickerState {
    currentPicker?: number | string;
    delayResults?: boolean;
    peopleList: IPersonaProps[];
    mostRecentlyUsed: IPersonaProps[];
    currentSelectedItems?: IPersonaProps[];
}
