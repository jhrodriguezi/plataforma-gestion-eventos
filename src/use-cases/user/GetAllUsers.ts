import { UserRepository } from "../../domain/interfaces/UserRepository";

export class GetAllUsers {
    constructor(private _userRepository: UserRepository) {}
    
    async execute() {
        return await this._userRepository.findAll();
    }
}