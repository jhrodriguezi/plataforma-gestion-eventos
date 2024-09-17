import bcrypt from 'bcrypt'
import { ROUNDS_BCRYPT } from '../config/constants'

export const encrypt = async (textPlain: string) => {
    if(!textPlain) return ''
    const hash = await bcrypt.hash(textPlain, ROUNDS_BCRYPT)
    return hash
}

export const compare = async (passwordPlain: string, hashPassword: string) => {
    return await bcrypt.compare(passwordPlain, hashPassword)
}