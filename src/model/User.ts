import {Event} from './Event';
import {Cost} from "./Cost.ts";

export interface User {
    userId: number;
    fname: string;
    lname: string;
    events: Event[];
    costs: Cost[];
}