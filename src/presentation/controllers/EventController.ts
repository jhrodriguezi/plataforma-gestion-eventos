import { CreateEventDTO } from "../../domain/dtos/EventCreateDTO";
import { DeleteEventDTO } from "../../domain/dtos/EventDeleteDTO";
import { GetByIdEventDTO } from "../../domain/dtos/EventGetByIdDTO";
import { UpdateEventDTO } from "../../domain/dtos/EventUpdateDTO";
import { Event } from "../../domain/entities/Event";
import { ILogger } from "../../domain/interfaces/ILogger";
import { CreateEvent } from "../../use-cases/event/CreateEvent";
import { DeleteEvent } from "../../use-cases/event/DeleteEvent";
import { GetEventById } from "../../use-cases/event/GetEventById";
import { UpdateEvent } from "../../use-cases/event/UpdateEvent";
import { CreateLocation } from "../../use-cases/location/CreateLocation";
import { Location } from "../../domain/entities/Location";
import { GetNearbyLocations } from "../../use-cases/event/GetNearbyLocations";
import { LocationData } from "../../domain/interfaces/IMapService";

export class EventController {
    constructor(
        private _createEvent: CreateEvent, 
        private _updateEvent: UpdateEvent,
        private _getEventById: GetEventById,
        private _deleteEvent: DeleteEvent,
        private _createLocation: CreateLocation,
        private _getNearbyLocations: GetNearbyLocations,
        private _logger: ILogger
    ) {}

    async getNearbyLocations(data: GetByIdEventDTO): Promise<LocationData[]> {
        this._logger.info(`Starting to gather locations`);
        const locations = await this._getNearbyLocations.execute(data);
        this._logger.info(`Locations fetched successfully`);
        return locations;
    }

    async createEvent(data: CreateEventDTO): Promise<Event> {
        this._logger.info(`Starting to create event with data: ${JSON.stringify(data)}`);
        const createdEvent = await this._createEvent.execute(data);
        this._logger.info(`Event created successfully with ID: ${createdEvent.id}`);
        return createdEvent;
    }

    async createLocation(address: string): Promise<Location> {
        this._logger.info(`Starting to create location with address: ${address}`);
        const location = await this._createLocation.execute(address);
        this._logger.info(`Location created successfully`);
        return location;
    }

    async deleteEvent(data: DeleteEventDTO): Promise<Event> {
        this._logger.info(`Starting to delete event with id: ${data.id}`);
        const event = await this._deleteEvent.execute(data)
        this._logger.info(`Event deleted successfully`);
        return event
    }

    async updateEvent(data: UpdateEventDTO) {
        this._logger.info(`Starting to update event with id: ${data.id}`);
        await this._updateEvent.execute(data)
        this._logger.info(`Event updated successfully`);

    }

    async getEventById(data: GetByIdEventDTO): Promise<Event> {
        this._logger.info(`Starting to get event with id: ${data}`);
        const event = await this._getEventById.execute(data);
        this._logger.info(`Event gotten successfully`);
        return event;
    }
}