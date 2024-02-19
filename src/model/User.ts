import { Event } from './Event';

export interface User {
    userId: number;
    fname: string;
    lname: string;
    events: Event[];
}