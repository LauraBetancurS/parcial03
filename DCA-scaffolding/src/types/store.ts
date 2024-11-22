import {  Eventpost} from "../types/postEvent";
export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
  event:Eventpost[];
};


export enum Actions {
	'NAVIGATE' = 'NAVIGATE',
}
export enum Screens {
	'ADMINVIEW' = 'ADMINVIEW',
	'USERVIEW' = 'ADMINVIEW',
	
}