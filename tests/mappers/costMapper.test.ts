import {CostMapper} from "../../src/mappers/costMapper";
import {CostDTO} from "../../src/DTOs/CostDTO";
import {Cost} from "../../src/model/Cost";
import {Status} from "../../src/enums/Status";


const user1 = {userId: 1, fname: 'John', lname: 'Doe', events: [], costs: []}
const event1 = {
    eventId: 1,
    status: Status.OPEN,
    eventDate: '2024-02-17',
    createdByUserId: 1,
    participants: [],
    costs: []
}
jest.mock('../../src/store/selectors', () => ({
    selectUserById: jest.fn((_userId) => (user1)),
    selectEventById: jest.fn((_eventId) => (event1)),
}));

describe('CostMapper', () => {
    let costMapper: CostMapper;

    beforeEach(() => {
        costMapper = new CostMapper();
    });

    it('converts Cost to CostDTO', () => {
        const cost: Cost = {
            productId: 1,
            name: 'Product 1',
            quantity: 10,
            unitPrice: 20,
            user: {userId: 1, fname: 'John', lname: 'Doe', events: [], costs: []},
            event: {
                eventId: 1,
                status: Status.OPEN,
                eventDate: '2024-02-17',
                createdByUserId: 1,
                participants: [],
                costs: []
            },
        };

        const expectedDTO: CostDTO = {
            productId: 1,
            name: 'Product 1',
            quantity: 10,
            unitPrice: 20,
            userId: 1,
            eventId: 1,
        };

        expect(costMapper.toDTO(cost)).toEqual(expectedDTO);
    });

    it('converts CostDTO to Cost', () => {
        const dto: CostDTO = {
            productId: 1,
            name: 'Product 1',
            quantity: 10,
            unitPrice: 20,
            userId: 1,
            eventId: 1,
        };

        const expectedCost: Cost = {
            productId: 1,
            name: 'Product 1',
            quantity: 10,
            unitPrice: 20,
            user: {userId: 1, fname: 'John', lname: 'Doe', events: [], costs: []},
            event: {
                eventId: 1,
                status: Status.OPEN,
                eventDate: '2024-02-17',
                createdByUserId: 1,
                participants: [],
                costs: []
            },
        };

        expect(costMapper.fromDTO(dto)).toEqual(expectedCost);
    });
});
