import { GetByIdUserDTO } from "../../domain/dtos/UserGetByIdDTO";
import { IReturnUserDTO } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";

export class GetUserById {
    constructor(private _userRepository: UserRepository) {}
    
    async execute(data: GetByIdUserDTO): Promise<IReturnUserDTO | null> {
        return await this._userRepository.findById(data);
    }
}