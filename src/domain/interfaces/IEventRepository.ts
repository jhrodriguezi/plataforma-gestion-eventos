import { CreateEventDTO } from "../dtos/EventCreateDTO";
import { DeleteEventDTO } from "../dtos/EventDeleteDTO";
import { GetByIdEventDTO } from "../dtos/EventGetByIdDTO";
import { UpdateEventDTO } from "../dtos/EventUpdateDTO";
import { Event } from "../entities/Event";

export interface IEventRepository {
    findById(data: GetByIdEventDTO): Promise<Event>;
    create(data: CreateEventDTO): Promise<Event>;
    update(data: UpdateEventDTO): Promise<void>;
    delete(data: DeleteEventDTO): Promise<Event>;
}