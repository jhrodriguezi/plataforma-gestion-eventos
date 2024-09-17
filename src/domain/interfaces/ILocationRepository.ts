import { CreateLocationDTO } from "../dtos/LocationCreateDTO";
import { GetByIdLocationDTO } from "../dtos/LocationGetByIdDTO";
import { Location } from "../entities/Location";

export interface ILocationRepository {
    findById(data: GetByIdLocationDTO): Promise<Location>;
    create(data: CreateLocationDTO): Promise<Location>;
}