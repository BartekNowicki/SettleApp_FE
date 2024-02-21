import {selectCostById, selectEventById, selectUserById} from "../../src/store/selectors";
import {User} from "../../src/model/User";
import {Cost} from "../../src/model/Cost";
import {Event} from "../../src/model/Event";
import {RootState} from "../../src/store/store";
import {Status} from "../../src/enums/Status";

describe('Selectors', () => {
    const user1: User = {userId: 1, fname: 'John', lname: 'Doe', events: [], costs: []};
    const user2: User = {userId: 2, fname: 'Alice', lname: 'Smith', events: [], costs: []};
    const event1: Event = {
        eventId: 1,
        status: Status.OPEN,
        eventDate: '2024-02-17',
        createdByUserId: 1,
        participants: [],
        costs: []
    };

    const event2: Event = {
        eventId: 2,
        status: Status.CLOSED,
        eventDate: '2024-02-18',
        createdByUserId: 2,
        participants: [],
        costs: []
    };
    const cost1: Cost = {
        productId: 1,
        name: 'Product 1',
        quantity: 10,
        unitPrice: 20,
        user: {userId: 1, fname: 'John', lname: 'Doe', events: [], costs: []},
        event: {
            eventId: 1,
            status: 'Active',
            eventDate: '2024-02-17',
            createdByUserId: 1,
            participants: [],
            costs: []
        }
    };

    const cost2: Cost = {
        productId: 2,
        name: 'Product 2',
        quantity: 5,
        unitPrice: 15,
        user: {userId: 2, fname: 'Alice', lname: 'Smith', events: [], costs: []},
        event: {
            eventId: 2,
            status: 'Inactive',
            eventDate: '2024-02-18',
            createdByUserId: 2,
            participants: [],
            costs: []
        }
    };


    const mockState: RootState = {
        user: {
            users: [user1, user2],
            loading: false,
            error: null,
        },
        event: {
            events: [event1, event2],
            loading: false,
            error: null,
        },
        cost: {
            costs: [cost1, cost2],
            loading: false,
            error: null,
        },
    };

    describe('selectUserById', () => {
        it('returns the user with the specified ID if it exists', () => {
            const selectedUser = selectUserById(1)(mockState);
            expect(selectedUser).toEqual(user1);
        });

        it('throws an error if the user with the specified ID does not exist', () => {
            expect(() => selectUserById(3)(mockState)).toThrowError('User with ID 3 not found');
        });
    });

    describe('selectEventById', () => {
        it('returns the event with the specified ID if it exists', () => {
            const selectedEvent = selectEventById(1)(mockState);
            expect(selectedEvent).toEqual(event1);
        });

        it('throws an error if the event with the specified ID does not exist', () => {
            expect(() => selectEventById(3)(mockState)).toThrowError('Event with ID 3 not found');
        });
    });

    describe('selectCostById', () => {
        it('returns the cost with the specified ID if it exists', () => {
            const selectedCost = selectCostById(1)(mockState);
            expect(selectedCost).toEqual(cost1);
        });

        it('throws an error if the cost with the specified ID does not exist', () => {
            expect(() => selectCostById(3)(mockState)).toThrowError('Cost with ID 3 not found');
        });
    });
});
