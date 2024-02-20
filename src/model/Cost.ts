import { User } from './User';
import { Event } from './Event';

export interface Cost {
    productId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    user: User;
    event: Event;
}
