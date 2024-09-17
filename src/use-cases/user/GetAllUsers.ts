import { UserRepository } from "../../domain/interfaces/UserRepository";

export class GetAllUsers {
    constructor(private _userRepository: UserRepository) {}
    
    async execute(page: number, pageSize: number) {
        return await this._userRepository.findAll(page, pageSize);
    }
}