import { IReturnUserDTO } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";

export class GetUserById {
    constructor(private _userRepository: UserRepository) {}
    
    async execute(id: string): Promise<IReturnUserDTO | null> {
        return await this._userRepository.findById(id);
    }
}