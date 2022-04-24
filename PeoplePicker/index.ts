import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { PeoplePickerNormal } from './Component/Peoplepicker';
import { IPeoplePickerProps } from './../PeoplePicker/Component/IPeoplePickerProps';

initializeIcons(undefined, { disableWarnings: true });
export class PCFUIFabricPeoplePicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private notifyOutputChanged: () => void;
	private _context: ComponentFramework.Context<IInputs>;
	container: HTMLDivElement;
	sortedRecordsIds: string[] = [];
	selectedvalue: any | undefined;
	//records: any[];
	records: {
		[id: string]: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord;
	};
	
	constructor(){}


	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
	{
		// Add control initialization code
		this.notifyOutputChanged = notifyOutputChanged;
		this._context = context;
		this._context.mode.trackContainerResize(true);
		this.container = container;
	}

	public handleCallback = (selectedUser: any) =>{
		this.selectedvalue = selectedUser;
		this.notifyOutputChanged();
	}

	public updateView(context: any): void
	{
		const dataset: any = context.parameters.people;
		this.records = dataset.records;
		this.sortedRecordsIds = dataset.sortedRecordIds;

		const allocatedWidth = parseInt(
			context.mode.allocatedWidth as unknown as string
		);
		const allocatedHeight = parseInt(
			context.mode.allocatedHeight as unknown as string
		);

		const objProp: IPeoplePickerProps = {
			records: this.records,
			sortedRecordIds: this.sortedRecordsIds,
			width: allocatedWidth,
			height: allocatedHeight,
			resolveDelay: 300,
			onChange: this.handleCallback
		};	

		ReactDOM.render(
			React.createElement(
				PeoplePickerNormal, 
				objProp	
			),
			this.container
		);
	}


	public getOutputs(): IOutputs
	{
		console.log('getOutputs')
		return { selectedItems: this.selectedvalue } as IOutputs;
	}


	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}

}
