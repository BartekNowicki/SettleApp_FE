import {RootState} from "./store";
import {User} from "../model/User";
import {Event} from "../model/Event";
import {Cost} from "../model/Cost.ts";

export const selectUserById = (userId: number) => (state: RootState): User => {
    const user = state.user.users.find(user => user.userId === userId);
    if (!user) {
        throw new Error(`User with ID ${userId} not found`);
    }
    return user;
};


export const selectEventById = (eventId: number) => (state: RootState): Event => {
    const event = state.event.events.find(event => event.eventId === eventId);
    if (!event) {
        throw new Error(`Event with ID ${eventId} not found`);
    }
    return event;
};

export const selectCostById = (productId: number) => (state: RootState): Cost => {
    const cost = state.cost.costs.find(cost => cost.productId === productId);
    if (!cost) {
        throw new Error(`Cost with ID ${productId} not found`);
    }
    return cost;
};

