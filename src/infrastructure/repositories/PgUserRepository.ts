import { Pool } from "pg";
import { IReturnUserDTO, User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";
import { queries } from "../../utils/loadSqlQueries";
import { pgCliet } from "../database/PgDbConnection";
import { AppError } from "../../errors/customError";
import { CreateUserDTO } from "../../domain/dtos/UserCreateDTO";
import { ILogger } from "../../domain/interfaces/ILogger";
import { UpdateUserDTO } from "../../domain/dtos/UserUpdateDTO";
import { GetByIdUserDTO } from "../../domain/dtos/UserGetByIdDTO";

export class PgUserRepository implements UserRepository {
    private _db: Pool = pgCliet();

    constructor(
        private _logger: ILogger
    ) {}
    
    async findAll(page: number, pageSize: number): Promise<IReturnUserDTO[]> {        
        const offset = (page - 1) * pageSize;
        try {
            const result = await this._db.query<IReturnUserDTO>(queries.getUsers, [pageSize, offset]);
            return result.rows;
        } catch (e) {
            const msg = `Failed to find users due to ${e?.toString()}`
            this._logger.error(msg, e)
            throw AppError.internalServer(msg);
        }
    }
    
    async findByEmail(email: string): Promise<User | null> {
        try {
            const result = await this._db.query<User>(queries.getUserByEmail, [email]);
            if(result.rows.length > 0) 
                return result.rows[0];
            return null
        } catch (e) {
            const msg = `Failed to find user due to ${e?.toString()}`
            this._logger.error(msg, e)
            throw AppError.internalServer(msg);
        }
    }

    async findById(data: GetByIdUserDTO): Promise<IReturnUserDTO | null> {
        try {
            const result = await this._db.query<IReturnUserDTO>(queries.getUserById, [data.id]);
            if(result.rows.length > 0) 
                return result.rows[0];
            return null
        } catch (e) {
            const msg = `Failed to find user due to ${e?.toString()}`
            this._logger.error(msg, {e})
            throw AppError.internalServer(msg);
        }
    }

    async create(user: CreateUserDTO): Promise<IReturnUserDTO> {
        try {
            const result = await this._db.query<IReturnUserDTO>(queries.registerUser, [user.name, user.email, user.password]);
            return result.rows[0];
        } catch(e) {
            const msg = `Failed to create user due to ${e?.toString()}`
            this._logger.error(msg, e);
            throw AppError.internalServer(msg);
        }
    }
    
    async update(user: UpdateUserDTO): Promise<void> {
        try {
            await this._db.query(queries.updateUserById, [user.name, user.email, user.password, user.id]);
            return;
        } catch (e) {
            const msg = `Failed to update user due to ${e?.toString()}`
            this._logger.error(msg, e)
            throw AppError.internalServer(msg);
        }
    }
}