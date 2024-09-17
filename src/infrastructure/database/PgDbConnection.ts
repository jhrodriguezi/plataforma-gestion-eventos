import { Pool } from 'pg';
import dotenv from 'dotenv'

let client: Pool;
dotenv.config()

export const pgCliet = (): Pool => {
    if(!client) {
        client = new Pool({
            host: process.env.DB_HOST,
            port: parseInt(`${process.env.DB_PORT}`),
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        });
    }
    return client;
}