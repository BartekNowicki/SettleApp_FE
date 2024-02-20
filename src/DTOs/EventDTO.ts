export interface EventDTO {
    eventId?: number;
    status: string;
    eventDate: string;
    createdByUserId: number;
    participantIds: number[];
    productIds: number[];
}
