import { User } from './User';

export interface Cost {
    productId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    user: User;
    event: Event;
}
