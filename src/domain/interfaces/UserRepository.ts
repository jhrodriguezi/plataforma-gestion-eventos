import { User } from "../entities/User";

export interface UserRepository {
    findById(id: string): Promise<User | null>;
    create(user: User): Promise<User>;
    update(user: User): Promise<void>;
    findAll(): Promise<User[]>;
}