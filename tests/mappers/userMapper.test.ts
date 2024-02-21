import {UserMapper} from "../../src/mappers/userMapper";
import {UserDTO} from "../../src/DTOs/UserDTO";
import {User} from "../../src/model/User";

const user1 = {userId: 1, fname: 'John', lname: 'Doe', events: [], costs: []};
const user2 = {userId: 2, fname: 'Alice', lname: 'Smith', events: [], costs: []};

jest.mock('../../src/store/selectors', () => ({
    selectUserById: jest.fn((_userId) => (_userId === 1 ? user1 : user2)),
    selectEventById: jest.fn((_eventId) => ({eventId: _eventId})),
}));

describe('UserMapper', () => {
    let userMapper: UserMapper;

    beforeEach(() => {
        userMapper = new UserMapper();
    });

    it('converts User to UserDTO', () => {
        const user: User = {
            userId: 1,
            fname: 'John',
            lname: 'Doe',
            events: [],
            costs: []
        };

        const expectedDTO: UserDTO = {
            userId: 1,
            fname: 'John',
            lname: 'Doe',
            eventIds: [],
            productIds: []
        };

        expect(userMapper.toDTO(user)).toEqual(expectedDTO);
    });

    it('converts UserDTO to User', () => {
        const dto: UserDTO = {
            userId: 1,
            fname: 'John',
            lname: 'Doe',
            eventIds: [],
            productIds: []
        };

        const expectedUser: User = {
            userId: 1,
            fname: 'John',
            lname: 'Doe',
            events: [],
            costs: []
        };

        expect(userMapper.fromDTO(dto)).toEqual(expectedUser);
    });
});
