import { GetByIdEventDTO } from "../../domain/dtos/EventGetByIdDTO";
import { GetByIdLocationDTO } from "../../domain/dtos/LocationGetByIdDTO";
import { IEventRepository } from "../../domain/interfaces/IEventRepository";
import { ILocationRepository } from "../../domain/interfaces/ILocationRepository";
import { IMapService } from "../../domain/interfaces/IMapService";

export class GetNearbyLocations {
    constructor(
        private _eventRepository: IEventRepository, 
        private _locationRepository: ILocationRepository,
        private _mapService: IMapService
    ) {}
    
    async execute(data: GetByIdEventDTO) {
        const event = await this._eventRepository.findById(data);
        const location = await this._locationRepository.findById(GetByIdLocationDTO.create({ id: event.location_id }))
        return await this._mapService.getNearbyPlaces(location.latitude, location.longitude, 50, 10)
    }
}