import { UserRepository } from "../../domain/interfaces/UserRepository";
import { AppError } from "../../errors/customError";
import { compare } from "../../utils/bcrypt";
import jwt from 'jsonwebtoken'

export class LoginUser {
    constructor(private _userRepository: UserRepository) { }

    async execute(email: string, password: string): Promise<LoginResponse> {
        const user = await this._userRepository.findByEmail(email);
        if (!user) throw AppError.unauthorized("No user found with the provided email.")
        const validPassword = await compare(password, user?.password_hash)
        if (validPassword) {
            const accessToken = jwt.sign({
                id: user.id,
                name: user.name,
            }, process.env.AUTH_TOKEN_SECRET as string, { expiresIn: process.env.AUTH_TOKEN_EXPIRATION_TIME as string });

            const refreshToken = jwt.sign({
                id: user.id,
                name: user.name,
            }, process.env.AUTH_TOKEN_SECRET as string);

            return { accessToken, refreshToken }
        } else {
            throw AppError.unauthorized("Invalid email or password.")
        }
    }
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}