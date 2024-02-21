import {EventMapper} from "../../src/mappers/eventMapper";
import {EventDTO} from "../../src/DTOs/EventDTO";
import {Event} from "../../src/model/Event";
import {Status} from "../../src/enums/Status";

const event1 = {
    eventId: 1,
    status: Status.OPEN,
    eventDate: '2024-02-17',
    createdByUserId: 1,
    participants: [],
    costs: []
};

const event2 = {
    eventId: 2,
    status: Status.CLOSED,
    eventDate: '2024-02-18',
    createdByUserId: 2,
    participants: [],
    costs: []
};

jest.mock('../../src/store/selectors', () => ({
    selectUserById: jest.fn((_userId) => ({userId: _userId})),
    selectEventById: jest.fn((_eventId) => (_eventId === 1 ? event1 : event2)),
}));

describe('EventMapper', () => {
    let eventMapper: EventMapper;

    beforeEach(() => {
        eventMapper = new EventMapper();
    });

    it('converts Event to EventDTO', () => {
        const event: Event = {
            eventId: 1,
            status: Status.OPEN,
            eventDate: '2024-02-17',
            createdByUserId: 1,
            participants: [],
            costs: []
        };

        const expectedDTO: EventDTO = {
            eventId: 1,
            status: Status.OPEN,
            eventDate: '2024-02-17',
            createdByUserId: 1,
            participantIds: [],
            productIds: []
        };

        expect(eventMapper.toDTO(event)).toEqual(expectedDTO);
    });

    it('converts EventDTO to Event', () => {
        const dto: EventDTO = {
            eventId: 1,
            status: Status.OPEN,
            eventDate: '2024-02-17',
            createdByUserId: 1,
            participantIds: [],
            productIds: []
        };

        const expectedEvent: Event = {
            eventId: 1,
            status: Status.OPEN,
            eventDate: '2024-02-17',
            createdByUserId: 1,
            participants: [],
            costs: []
        };

        expect(eventMapper.fromDTO(dto)).toEqual(expectedEvent);
    });
});
