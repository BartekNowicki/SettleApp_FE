import {Mapper} from "./mapper";
import {Cost} from "../model/Cost";
import {CostDTO} from "../DTOs/CostDTO.ts";
import {selectEventById, selectUserById} from "../store/selectors";
import {User} from "../model/User";
import {Event} from "../model/Event";

export class CostMapper implements Mapper<Cost, CostDTO> {
    toDTO(cost: Cost): CostDTO {
        const dto: CostDTO = {
            productId: cost.productId,
            name: cost.name,
            quantity: cost.quantity,
            unitPrice: cost.unitPrice,
            userId: cost.user.userId,
            eventId: cost.event.eventId,
        };
        return dto;
    }

    fromDTO(dto: CostDTO): Cost {
        const cost: Cost = {
            productId: dto.productId!,
            name: dto.name,
            quantity: dto.quantity,
            unitPrice: dto.unitPrice,
            user: selectUserById(dto.userId) as unknown as User,
            event: selectEventById(dto.eventId) as unknown as Event,
        };
        return cost;
    }
}
