import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { PeoplePickerNormal } from './Component/Peoplepicker';

initializeIcons(undefined, { disableWarnings: true });

export class PCFUIFabricPeoplePicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private theContainer: HTMLDivElement;
	private notifyOutputChanged: () => void;
	private _context: ComponentFramework.Context<IInputs>;
	container: HTMLDivElement;
	sortedRecordsIds: string[] = [];
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
		this.container = container;
	}


	public updateView(context: any): void
	{
		const dataset: any = context.parameters.people;
		this.records = dataset.records;
		this.sortedRecordsIds = dataset.sortedRecordIds;
		// The test harness provides width/height as strings
		const allocatedWidth = parseInt(
			context.mode.allocatedWidth as unknown as string
		);
		const allocatedHeight = parseInt(
			context.mode.allocatedHeight as unknown as string
		);

		const objProp = {
			records: this.records,
			sortedRecordIds: this.sortedRecordsIds,
			width: allocatedWidth,
			height: allocatedHeight,
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
		return {};
	}


	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}

}
