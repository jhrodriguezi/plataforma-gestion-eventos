import { CreateLocationDTO } from "../../domain/dtos/LocationCreateDTO";
import { ILocationRepository } from "../../domain/interfaces/ILocationRepository";
import { IMapService, LocationData } from "../../domain/interfaces/IMapService";
import { AppError, ValidationType } from "../../errors/customError";

export class CreateLocation {
    constructor(private _locationRepository: ILocationRepository, private _mapService: IMapService) {}
    
    async execute(address: string) {
        const errors: ValidationType[] = [];

        if (!address) {
            errors.push({ fields: ['address'], constraint: 'Address is required'})
        }

        if (errors.length > 0) throw AppError.badRequest('Error validating create location', errors);
        
        const location: LocationData = await this._mapService.getDataFromAddress(address);
        return await this._locationRepository.create(CreateLocationDTO.create({...location, postal_code: location.postalCode}));
    }
}