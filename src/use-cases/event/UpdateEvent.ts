import { UpdateEventDTO } from "../../domain/dtos/EventUpdateDTO";
import { IEventRepository } from "../../domain/interfaces/IEventRepository";

export class UpdateEvent {
    constructor(private _eventRepository: IEventRepository) {}
    
    async execute(data: UpdateEventDTO) {
        return await this._eventRepository.update(data);
    }
}