import { CreateUserDTO } from "../../domain/dtos/UserCreateDTO";
import { UserRepository } from "../../domain/interfaces/UserRepository";

export class CreateUser {
    constructor(private _userRepository: UserRepository) { }

    async execute(user: CreateUserDTO) {
        return await this._userRepository.create(user);
    }
}