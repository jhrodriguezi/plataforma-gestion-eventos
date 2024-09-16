import { UserRepository } from "../domain/interfaces/UserRepository";
import { UserController } from "../presentation/controllers/UserController";
import { CreateUser } from "../use-cases/user/CreateUser";
import { GetAllUsers } from "../use-cases/user/GetAllUsers";
import { GetUserById } from "../use-cases/user/GetUserById";
import { UpdateUser } from "../use-cases/user/UpdateUser";
import { PgUserRepository } from "./repositories/PgUserRepository";

class DIContainer {
    // user-related classes
    private static _userRepository = new PgUserRepository();
    
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

    static getUserController(): UserController {
        return new UserController(
            this.getCreateUserUseCase(),
            this.getGetAllUsersUseCase(),
            this.getUpdateUserUseCase(),
            this.getGetUserByIdUseCase()
        )
    }


}

export { DIContainer }