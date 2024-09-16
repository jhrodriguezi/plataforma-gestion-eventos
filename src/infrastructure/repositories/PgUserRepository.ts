import { Pool } from "pg";
import { ICreateUserDTO, IReturnUserDTO, IUpdateUserDTO } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";
import { queries } from "../../utils/loadSqlQueries";
import { pgCliet } from "../database/PgDbConnection";

export class PgUserRepository implements UserRepository {
    private _db: Pool = pgCliet();

    async findAll(page: number, pageSize: number): Promise<IReturnUserDTO[]> {        
        const offset = (page - 1) * pageSize;
        try {
            const result = await this._db.query<IReturnUserDTO>(queries.getUsers, [pageSize, offset]);
            return result.rows;
        } catch (e) {
            console.log(e)
            throw Error();
        }
    }

    async findById(id: string): Promise<IReturnUserDTO | null> {
        try {
            const result = await this._db.query<IReturnUserDTO>(queries.getUserById, [id]);
            if(result.rows.length > 0) 
                return result.rows[0];
            return null
        } catch (e) {
            console.log(e)
            throw Error();
        }
    }

    async create(user: ICreateUserDTO): Promise<IReturnUserDTO> {
        try {
            const result = await this._db.query<IReturnUserDTO>(queries.registerUser, [user.name, user.email, user.password_hash]);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            throw Error();
        }
    }
    
    async update(user: IUpdateUserDTO): Promise<void> {
        try {
            await this._db.query(queries.updateUserById, [user.name, user.email, user.password_hash, user.id]);
            return;
        } catch (e) {
            console.log(e)
            throw Error();
        }
    }
}