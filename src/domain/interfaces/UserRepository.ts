import { ICreateUserDTO, IReturnUserDTO, IUpdateUserDTO, User } from "../entities/User";

export interface UserRepository {
    findById(id: string): Promise<IReturnUserDTO | null>;
    create(user: ICreateUserDTO): Promise<IReturnUserDTO>;
    update(user: IUpdateUserDTO): Promise<void>;
    findAll(page: number, pageSize: number): Promise<IReturnUserDTO[]>;
}