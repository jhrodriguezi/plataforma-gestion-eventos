import { CreateLocationDTO } from "../../domain/dtos/LocationCreateDTO";
import { GetByIdLocationDTO } from "../../domain/dtos/LocationGetByIdDTO";
import { ILocationRepository } from "../../domain/interfaces/ILocationRepository";
import { Location } from "../../domain/entities/Location";
import { queries } from "../../utils/loadSqlQueries";
import { Pool } from "pg";
import { pgCliet } from "../database/PgDbConnection";
import { AppError } from "../../errors/customError";

export class PgLocationRepository implements ILocationRepository {
    private _db: Pool = pgCliet();
    
    async findById(data: GetByIdLocationDTO): Promise<Location> {
        try {
            const result = await this._db.query<Location>(queries.getLocationById, [data.id])
            if (result.rows.length > 0)
                return result.rows[0]
            throw AppError.internalServer(`Location with id ${data.id} was not found`) 
        } catch (e) {
            throw AppError.internalServer(`Failed to get location due to ${e?.toString()}`);
        }
    }
    
    async create(data: CreateLocationDTO): Promise<Location> {
        try {
            const result = await this._db.query<Location>(
                queries.registerLocation,
                [data.name, data.address, data.latitude,
                data.longitude, data.city, data.country, data.postal_code]
            )
            return result.rows[0]
        } catch (e) {
            throw AppError.internalServer(`Failed to create location due to ${e?.toString()}`);
        }
    }
}