export class User {
    public readonly id: string;
    public name: string;
    public email: string;
    public password_hash: string;
    public created_at: Date;
    public updated_at: Date;

    private constructor(
        id: string,
        name: string,
        email: string,
        password_hash: string,
        created_at: Date,
        updated_at: Date
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password_hash = password_hash;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    public static createInstance(
        name: string,
        email: string,
        password_hash: string,
    ) {
        const now = new Date();
        return new User('', name, email, password_hash, now, now);
    }

    public static fromDatabase(
        id: string,
        name: string,
        email: string,
        password_hash: string,
        created_at: Date,
        updated_at: Date
    ) {
        return new User(id, name, email, password_hash, created_at, updated_at);
    }
}

export interface ICreateUserDTO {
    name: string;
    email: string;
    password_hash: string;
}

export interface IReturnUserDTO {
    id: string;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export interface IUpdateUserDTO {
    id: string;
    name: string;
    email: string;
    password_hash: string;
}