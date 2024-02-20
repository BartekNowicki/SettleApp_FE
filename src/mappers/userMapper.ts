import {User} from '../model/User';
import {UserDTO} from "../DTOs/UserDTO.ts";
import {Mapper} from "./mapper.ts";
import {selectCostById, selectEventById} from "../store/selectors.ts";
import {Cost} from "../model/Cost";
import {Event} from "../model/Event";

export class UserMapper implements Mapper<User, UserDTO> {

    toDTO(user: User): UserDTO {
        const dto: UserDTO = {
            userId: user.userId,
            fname: user.fname,
            lname: user.lname,
            eventIds: user.events.map(event => event.eventId),
            productIds: user.costs.map(cost => cost.productId),
        };
        return dto;
    }

    fromDTO(dto: UserDTO): User {
        const user: User = {
            userId: dto.userId!,
            fname: dto.fname,
            lname: dto.lname,
            costs: dto.productIds.map(id => selectCostById(id!) as unknown as Cost),
            events: dto.eventIds.map(id => selectEventById(id!) as unknown as Event),
        };
        return user;
    }
}
