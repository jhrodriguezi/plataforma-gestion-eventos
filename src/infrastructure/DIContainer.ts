import { ILogger } from "../domain/interfaces/ILogger";
import { UserRepository } from "../domain/interfaces/UserRepository";
import { EventController } from "../presentation/controllers/EventController";
import { UserController } from "../presentation/controllers/UserController";
import { CreateEvent } from "../use-cases/event/CreateEvent";
import { DeleteEvent } from "../use-cases/event/DeleteEvent";
import { GetEventById } from "../use-cases/event/GetEventById";
import { GetNearbyLocations } from "../use-cases/event/GetNearbyLocations";
import { UpdateEvent } from "../use-cases/event/UpdateEvent";
import { CreateLocation } from "../use-cases/location/CreateLocation";
import { CreateUser } from "../use-cases/user/CreateUser";
import { GetAllUsers } from "../use-cases/user/GetAllUsers";
import { GetUserById } from "../use-cases/user/GetUserById";
import { LoginUser } from "../use-cases/user/LoginUser";
import { UpdateUser } from "../use-cases/user/UpdateUser";
import { WinstonLogger } from "./logger/WinstonLogger";
import { PgEventRepository } from "./repositories/PgEventRepository";
import { PgLocationRepository } from "./repositories/PgLocationRepository";
import { PgUserRepository } from "./repositories/PgUserRepository";
import { MapBoxService } from "./services/MapBoxService";

class DIContainer {
    private static _logger = new WinstonLogger();
    private static _mapService = new MapBoxService();
    private static _eventRepository = new PgEventRepository();
    private static _locationRepository = new PgLocationRepository();
    private static _userRepository = new PgUserRepository(this.getLogger());
    
    static getUserRepository(): UserRepository {
        return this._userRepository;
    }

    static getCreateUserUseCase(): CreateUser {
        return new CreateUser(this.getUserRepository());
    }

    static getGetAllUsersUseCase(): GetAllUsers {
        return new GetAllUsers(this.getUserRepository());
    }

    static getUpdateUserUseCase(): UpdateUser {
        return new UpdateUser(this.getUserRepository());
    }

    static getGetUserByIdUseCase(): GetUserById {
        return new GetUserById(this.getUserRepository());
    }
    
    static getLoginUserUseCase(): LoginUser {
        return new LoginUser(this.getUserRepository())
    }

    static getLogger(): ILogger {
        return this._logger;
    }

    static getUserController(): UserController {
        return new UserController(
            this.getCreateUserUseCase(),
            this.getGetAllUsersUseCase(),
            this.getUpdateUserUseCase(),
            this.getGetUserByIdUseCase(),
            this.getLoginUserUseCase(),
            this.getLogger()
        )
    }

    static getCreateEventUseCase(): CreateEvent{
        return new CreateEvent(this._eventRepository);
    }

    static getUpdateEventUseCase(): UpdateEvent{
        return new UpdateEvent(this._eventRepository);
    }

    static getGetEventByIdUseCase(): GetEventById{
        return new GetEventById(this._eventRepository);
    }

    static getDeleteEventUseCase(): DeleteEvent{
        return new DeleteEvent(this._eventRepository);
    }

    static getNearbyLocationByEventId(): GetNearbyLocations {
        return new GetNearbyLocations(this._eventRepository, this._locationRepository, this._mapService)
    }

    static getCreateLocationUseCase() {
        return new CreateLocation(
            this._locationRepository,
            this._mapService
        );
    }

    static getEventController(): EventController {
        return new EventController(
            this.getCreateEventUseCase(),
            this.getUpdateEventUseCase(),
            this.getGetEventByIdUseCase(),
            this.getDeleteEventUseCase(),
            this.getCreateLocationUseCase(),
            this.getNearbyLocationByEventId(),
            this.getLogger()
        );
    }
}

export { DIContainer }