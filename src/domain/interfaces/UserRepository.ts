import { CreateUserDTO } from "../dtos/UserCreateDTO";
import { GetByIdUserDTO } from "../dtos/UserGetByIdDTO";
import { UpdateUserDTO } from "../dtos/UserUpdateDTO";
import { IReturnUserDTO, User } from "../entities/User";

export interface UserRepository {
    findById(data: GetByIdUserDTO): Promise<IReturnUserDTO | null>;
    create(user: CreateUserDTO): Promise<IReturnUserDTO>;
    update(user: UpdateUserDTO): Promise<void>;
    findAll(page: number, pageSize: number): Promise<IReturnUserDTO[]>;
    findByEmail(email: string): Promise<User | null>;
}