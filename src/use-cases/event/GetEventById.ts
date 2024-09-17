import { GetByIdEventDTO } from "../../domain/dtos/EventGetByIdDTO";
import { IEventRepository } from "../../domain/interfaces/IEventRepository";

export class GetEventById {
    constructor(private _eventRepository: IEventRepository) {}
    
    async execute(data: GetByIdEventDTO) {
        return await this._eventRepository.findById(data);
    }
}