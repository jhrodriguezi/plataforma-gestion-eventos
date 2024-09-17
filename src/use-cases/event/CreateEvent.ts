import { CreateEventDTO } from "../../domain/dtos/EventCreateDTO";
import { IEventRepository } from "../../domain/interfaces/IEventRepository";

export class CreateEvent {
    constructor(private _eventRepository: IEventRepository) {}
    
    async execute(data: CreateEventDTO) {
        return await this._eventRepository.create(data);
    }
}