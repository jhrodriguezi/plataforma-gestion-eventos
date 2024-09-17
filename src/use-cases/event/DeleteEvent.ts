import { DeleteEventDTO } from "../../domain/dtos/EventDeleteDTO";
import { IEventRepository } from "../../domain/interfaces/IEventRepository";

export class DeleteEvent {
    constructor(private _eventRepository: IEventRepository) {}
    
    async execute(data: DeleteEventDTO) {
        return await this._eventRepository.delete(data);
    }
}