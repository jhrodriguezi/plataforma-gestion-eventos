import { UpdateUserDTO } from "../../domain/dtos/UserUpdateDTO";
import { UserRepository } from "../../domain/interfaces/UserRepository";

export class UpdateUser {
    constructor(private _userRepository: UserRepository) {}
    
    async execute(user: UpdateUserDTO) {
        return await this._userRepository.update(user);
    }
}