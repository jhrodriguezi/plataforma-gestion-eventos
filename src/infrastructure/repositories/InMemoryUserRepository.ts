import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";

export class InMemoryUserRepository implements UserRepository {
    static id = 1;
    private _users: Array<User> = []

    async findAll(): Promise<User[]> {
        return this._users;
    }

    async findById(id: string): Promise<User | null> {
        return this._users.find(user => user.id === id) || null;
    }

    async create(user: User): Promise<User> {
        const newUser = User.fromDatabase(InMemoryUserRepository.id.toString(), user.name, 
        user.email, user.password_hash, user.created_at, user.updated_at);
        this._users.push(newUser);
        InMemoryUserRepository.id++;
        return newUser;
    }
    
    async update(user: User): Promise<void> {
        const index = this._users.findIndex(u => u.id === user.id);
        if(index !== -1) {
            this._users[index] = user;
        }
    }
}