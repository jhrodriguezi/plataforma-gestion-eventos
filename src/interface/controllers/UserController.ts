import { User } from "../../domain/entities/User";
import { CreateUser } from "../../use-cases/user/CreateUser";
import { GetAllUsers } from "../../use-cases/user/GetAllUsers";

export class UserController {
    constructor(private _createUser: CreateUser, private _getAllUsers: GetAllUsers) {}

    async createUser(user: User) {
        const createdUser = await this._createUser.execute(user);
        return createdUser;
    }

    async getAllUsers() {
        return await this._getAllUsers.execute();
    }
}