export interface Mapper<Entity, EntityDTO> {
    toDTO(entity: Entity): EntityDTO;
    fromDTO(entityDTO: EntityDTO): Entity;
}
