import { GetByIdLocationDTO } from "../../domain/dtos/LocationGetByIdDTO";
import { ILocationRepository } from "../../domain/interfaces/ILocationRepository";

export class GetEventById {
    constructor(private _locationRepository: ILocationRepository) {}
    
    async execute(data: GetByIdLocationDTO) {
        return await this._locationRepository.findById(data);
    }
}