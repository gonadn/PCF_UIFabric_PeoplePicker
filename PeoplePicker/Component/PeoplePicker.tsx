import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { IBasePickerSuggestionsProps, NormalPeoplePicker, ValidationState } from '@fluentui/react/lib/Pickers';
import { people, mru } from '@fluentui/example-data';
import { IPeoplePickerProps } from './IPeoplePickerProps';
const { convertArrayToCSV } = require('convert-array-to-csv');
const converter = require('convert-array-to-csv');
// export interface IPeoplePickerProps {
//   records: Record<string, ComponentFramework.PropertyHelper.DataSetApi.EntityRecord>;
//   sortedRecordIds: string[];
//   width?: number;
//   height?: number;
// }

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading',
  showRemoveButtons: true,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts',
};

// eslint-disable-next-line react/display-name
export const PeoplePickerNormal = React.memo((props: IPeoplePickerProps) => {
  const {records, sortedRecordIds, width, height, resolveDelay} = props;
  const [delayResults] = React.useState(false);
  const [isPickerDisabled, setIsPickerDisabled] = React.useState(false);
  const [mostRecentlyUsed, setMostRecentlyUsed] = React.useState<IPersonaProps[]>([]);
  const [peopleList, setPeopleList] = React.useState<IPersonaProps[]>([]);
  const [currentSelectedItems, setCurrentSelectedItems] = React.useState<IPersonaProps[]>([]);
  const picker = React.useRef(null);

  useMemo(() => {
    //console.log(people);
    // const header = ['key','imageUrl', 'imageInitials', 'text','secondaryText','tertiaryText','optionalText','isValid','presence'];
    //  const csvFromArrayOfArrays = convertArrayToCSV(people, {
    //   header,
    //   separator: ';'
    //  });
    //  console.log(csvFromArrayOfArrays);

    let count: number = 1;
    const items: any[] = [];
    if (props.sortedRecordIds.length !== 0) {
      console.log(props)
      props.sortedRecordIds.map((id: any) => {
        let recObj: any;
        const record: any = records[id];
        // const _id: string = record.getFormattedValue('Id');
        // const secTxt: string = record.getFormattedValue('JobTitle');
        // const txt: string = record.getFormattedValue('DisplayName');
        // const _upn: string = record.getFormattedValue('UserPrincipalName');

        const secTxt: string = record.getFormattedValue('jobTitle');
        const txt: string = record.getFormattedValue('displayName');
        const _upn: string = record.getFormattedValue('userPrincipalName');

        if (txt !== null && txt !== undefined) {
          recObj = {
            key: count++,
            secondaryText: secTxt,
            tertiaryText: 'In a meeting',
            text: txt,
            optionalText: '',
            presence: 2,
            isValid: true,
            imageUrl: '',
            imageInitials: 'IN',
            upn: _upn
          };
        }
        if(recObj!==null&&recObj!==undefined){
          items.push(recObj);
        }
        //return recObj;
      });
      
      if (items.length !== 0) {
        console.log(items);
        setPeopleList(people);
      }
    }
    
    setPeopleList(people);
  }, [records, sortedRecordIds, width, height, resolveDelay]);

  
  const onFilterChanged = (filterText: string, currentPersonas: IPersonaProps[], limitResults?: number): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = filterPersonasByText(filterText);

      filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.slice(0, limitResults) : filteredPersonas;
      return filterPromise(filteredPersonas);
    } else {
      return [];
    }
  };

  const filterPersonasByText = (filterText: string): IPersonaProps[] => {
    return peopleList.filter(item => doesTextStartWith(item.text as string, filterText));
  };

  const filterPromise = (personasToReturn: IPersonaProps[]) => {
    if (delayResults) {
      return convertResultsToPromise(personasToReturn);
    } else {
      return personasToReturn;
    }
  };

  const returnMostRecentlyUsed = (currentPersonas: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> => {
    return filterPromise(removeDuplicates(mostRecentlyUsed, currentPersonas));
  };

  const onRemoveSuggestion = (item: IPersonaProps): void => {
    const indexPeopleList: number = peopleList.indexOf(item);
    const indexMostRecentlyUsed: number = mostRecentlyUsed.indexOf(item);

    if (indexPeopleList >= 0) {
      const newPeople: IPersonaProps[] = peopleList
        .slice(0, indexPeopleList)
        .concat(peopleList.slice(indexPeopleList + 1));
      setPeopleList(newPeople);
    }

    if (indexMostRecentlyUsed >= 0) {
      const newSuggestedPeople: IPersonaProps[] = mostRecentlyUsed
        .slice(0, indexMostRecentlyUsed)
        .concat(mostRecentlyUsed.slice(indexMostRecentlyUsed + 1));
      setMostRecentlyUsed(newSuggestedPeople);
    }
  };

  const getTextFromItem = (persona: IPersonaProps): string => {
    return persona.text as string;
  }

  const onItemsChange = (items: any[]): void => {
    setCurrentSelectedItems(items);
    props.onChange(items);
  };

  const rootContainerStyle: any = React.useMemo(() => {
    return {
        height: height,
        width: width,
    };
  }, [width, height]);

  return (
    <div>
      <NormalPeoplePicker
        onResolveSuggestions={onFilterChanged}
        onEmptyInputFocus={returnMostRecentlyUsed}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={suggestionProps}
        // className={'ms-PeoplePicker'}
        key={'normal'}
        onRemoveSuggestion={onRemoveSuggestion}
        onValidateInput={validateInput}
        selectionAriaLabel={'Selected contacts'}
        removeButtonAriaLabel={'Remove'}
        onChange={onItemsChange}
        selectedItems={currentSelectedItems}
        // inputProps={{
        //   onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
        //   onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
        //   'aria-label': 'People Picker',
        // }}
        componentRef={picker}
        onInputChange={onInputChange}
        resolveDelay={300}
        disabled={isPickerDisabled}
        styles={{ root: { width: width, height: height } }}
      />
    </div>
  );
});

function doesTextStartWith(text: string, filterText: string): boolean {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}

function removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
  return personas.filter(persona => !listContainsPersona(persona, possibleDupes));
}

function listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
  if (!personas || !personas.length || personas.length === 0) {
    return false;
  }
  return personas.filter(item => item.text === persona.text).length > 0;
}

function convertResultsToPromise(results: IPersonaProps[]): Promise<IPersonaProps[]> {
  return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 2000));
}

// function getTextFromItem(persona: IPersonaProps): string {
//   console.log(persona.text);
  
//   return persona.text as string;
// }

function validateInput(input: string): ValidationState {
  if (input.indexOf('@') !== -1) {
    return ValidationState.valid;
  } else if (input.length > 1) {
    return ValidationState.warning;
  } else {
    return ValidationState.invalid;
  }
}

/**
 * Takes in the picker input and modifies it in whichever way
 * the caller wants, i.e. parsing entries copied from Outlook (sample
 * input: "Aaron Reid <aaron>").
 *
 * @param input The text entered into the picker.
 */
function onInputChange(input: string): string {
  const outlookRegEx = /<.*>/g;
  const emailAddress = outlookRegEx.exec(input);

  if (emailAddress && emailAddress[0]) {
    return emailAddress[0].substring(1, emailAddress[0].length - 1);
  }

  return input;
}

