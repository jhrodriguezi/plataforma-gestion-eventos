import { CreateUserDTO } from "../../domain/dtos/UserCreateDTO";
import { GetByIdUserDTO } from "../../domain/dtos/UserGetByIdDTO";
import { UpdateUserDTO } from "../../domain/dtos/UserUpdateDTO";
import { IReturnUserDTO } from "../../domain/entities/User";
import { ILogger } from "../../domain/interfaces/ILogger";
import { CreateUser } from "../../use-cases/user/CreateUser";
import { GetAllUsers } from "../../use-cases/user/GetAllUsers";
import { GetUserById } from "../../use-cases/user/GetUserById";
import { LoginResponse, LoginUser } from "../../use-cases/user/LoginUser";
import { UpdateUser } from "../../use-cases/user/UpdateUser";

export class UserController {
    constructor(
        private _createUser: CreateUser,
        private _getAllUsers: GetAllUsers,
        private _updateUser: UpdateUser,
        private _getUserById: GetUserById,
        private _login: LoginUser,
        private _logger: ILogger
    ) { }

    async createUser(user: CreateUserDTO): Promise<IReturnUserDTO> {
        this._logger.info(`Starting to create user with data: ${JSON.stringify({ ...user })}`);
        const createdUser = await this._createUser.execute(user);
        this._logger.info(`Event created successfully with ID: ${createdUser.id}`);
        return createdUser;
    }

    async getAllUsers(page: number, pageSize: number) {
        return await this._getAllUsers.execute(page, pageSize);
    }

    async updateUser(user: UpdateUserDTO) {
        await this._updateUser.execute(user)
    }

    async login(email: string, password: string): Promise<LoginResponse> {
        return await this._login.execute(email, password);
    }

    async getUserById(data: GetByIdUserDTO): Promise<IReturnUserDTO | null> {
        return await this._getUserById.execute(data);
    }
}