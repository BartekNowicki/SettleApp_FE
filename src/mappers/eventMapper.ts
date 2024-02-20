import {Event} from '../model/Event';
import {Mapper} from "./mapper";
import {EventDTO} from "../DTOs/EventDTO";
import {selectCostById, selectUserById} from "../store/selectors.ts";
import {User} from "../model/User.ts";
import {Cost} from "../model/Cost.ts";

export class EventMapper implements Mapper<Event, EventDTO> {

    toDTO(event: Event): EventDTO {
        const dto: EventDTO = {
            eventId: event.eventId,
            status: event.status,
            eventDate: event.eventDate,
            createdByUserId: event.createdByUserId,
            participantIds: event.participants.map(user => user.userId),
            productIds: event.costs.map(cost => cost.productId),
        };
        return dto;
    }

    fromDTO(dto: EventDTO): Event {
        const event: Event = {
            eventId: dto.eventId!,
            status: dto.status,
            eventDate: dto.eventDate,
            createdByUserId: dto.createdByUserId,
            participants: dto.participantIds.map(id => selectUserById(id!) as unknown as User),
            costs: dto.productIds.map(id => selectCostById(id!) as unknown as Cost),
        };
        return event;
    }
}
