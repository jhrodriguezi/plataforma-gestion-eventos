import { ICreateUserDTO, IReturnUserDTO, IUpdateUserDTO } from "../../domain/entities/User";
import { CreateUser } from "../../use-cases/user/CreateUser";
import { GetAllUsers } from "../../use-cases/user/GetAllUsers";
import { GetUserById } from "../../use-cases/user/GetUserById";
import { UpdateUser } from "../../use-cases/user/UpdateUser";

export class UserController {
    constructor(
        private _createUser: CreateUser, 
        private _getAllUsers: GetAllUsers,
        private _updateUser: UpdateUser,
        private _getUserById: GetUserById,
    ) {}

    async createUser(user: ICreateUserDTO): Promise<IReturnUserDTO> {
        const createdUser = await this._createUser.execute(user);
        return createdUser;
    }

    async getAllUsers(page: number, pageSize: number) {
        return await this._getAllUsers.execute(page, pageSize);
    }

    async updateUser(user: IUpdateUserDTO) {
        await this._updateUser.execute(user)
    }

    async getUserById(id: string): Promise<IReturnUserDTO | null> {
        return await this._getUserById.execute(id); 
    }
}