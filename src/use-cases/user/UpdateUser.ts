import { IUpdateUserDTO } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";

export class UpdateUser {
    constructor(private _userRepository: UserRepository) {}
    
    async execute(user: IUpdateUserDTO) {
        return await this._userRepository.update(user);
    }
}