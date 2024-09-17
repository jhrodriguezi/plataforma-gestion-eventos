import { Pool } from "pg";
import { IEventRepository } from "../../domain/interfaces/IEventRepository";
import { Event } from "../../domain/entities/Event";
import { pgCliet } from "../database/PgDbConnection";
import { queries } from "../../utils/loadSqlQueries";
import { CreateEventDTO } from "../../domain/dtos/EventCreateDTO";
import { AppError } from "../../errors/customError";
import { UpdateEventDTO } from "../../domain/dtos/EventUpdateDTO";
import { GetByIdEventDTO } from "../../domain/dtos/EventGetByIdDTO";
import { DeleteEventDTO } from "../../domain/dtos/EventDeleteDTO";

export class PgEventRepository implements IEventRepository {
    private _db: Pool = pgCliet();

    async findById(data: GetByIdEventDTO): Promise<Event> {
        try {
            const result = await this._db.query<Event>(queries.getEventById, [data.id]);
            if (result.rows.length > 0)
                return result.rows[0];
            throw AppError.internalServer(`Event with id ${data.id} was not found`)
        } catch (e) {
            throw AppError.internalServer(`Failed to obtain event due to ${e?.toString()}`);
        }
    }

    async create(data: CreateEventDTO): Promise<Event> {
        try {
            const result = await this._db.query<Event>(
                queries.registerEvent,
                [data.user_id, data.location_id, data.name,
                data.description, data.date_time, data.capacity, data.status]
            )
            return result.rows[0]
        } catch (e) {
            throw AppError.internalServer(`Failed to create event due to ${e?.toString()}`);
        }
    }

    async update(data: UpdateEventDTO): Promise<void> {
        try {
            await this._db.query(
                queries.updateEvent, 
                [data.user_id, data.location_id, data.name,
                data.description, data.date_time, data.capacity, data.status, data.id]);
            return;
        } catch (e) {
            throw AppError.internalServer(`Failed to update event due to ${e?.toString()}`);
        }
    }

    async delete(data: DeleteEventDTO): Promise<Event> {
        try {
            const result = await this._db.query<Event>(queries.deleteEventAndAttendances, [data.id]);
            return result.rows[0];
        } catch(e) {
            throw AppError.internalServer(`Failed to delete event due to ${e?.toString()}`);
        }
    }

}