import { User } from './User';
import { Cost } from './Cost';

export interface Event {
    eventId: number;
    status: string;
    eventDate: string;
    createdByUserId: number;
    participants: User[];
    costs: Cost[];
}
