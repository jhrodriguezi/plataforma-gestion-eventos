import { ICreateUserDTO, User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";

export class CreateUser {
    constructor(private _userRepository: UserRepository) {}
    
    async execute(user: ICreateUserDTO) {
        return await this._userRepository.create(user);
    }
}