import { Pool } from "pg";
import fs from 'fs';
import path from 'path';
import { AppError } from "../errors/customError";
import { DIContainer } from "../infrastructure/DIContainer";

export async function runMigrations(pool: Pool) {
    const logger = DIContainer.getLogger();
    const database = process.env.DB_NAME;
    let client = await pool.connect();

    try {

        const result = await client.query(
            "SELECT 1 FROM pg_database WHERE datname = $1",
            [database]
        );

        if (result.rows.length === 0) {
            // La base de datos no existe, la creamos
            await client.query(`CREATE DATABASE "${database}"`);
            logger.info(`Database '${database}' created.`);
        } else {
            logger.info(`Database '${database}' already exists.`);
        }

        await client.query('BEGIN');
        
        await client.query(`
            CREATE TABLE IF NOT EXISTS migrations (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Leer todos los archivos de migración
        const migrationsDir = path.join(__dirname, '..', 'infrastructure', 'database', 'migrations');
        const migrationFiles = fs.readdirSync(migrationsDir).sort();

        for (const file of migrationFiles) {
            const migrationName = path.parse(file).name;

            // Verificar si la migración ya se ha ejecutado
            const { rows } = await client.query('SELECT id FROM migrations WHERE name = $1', [migrationName]);
            if (rows.length === 0) {
                logger.info(`Running migration: ${migrationName}`);

                const migrationPath = path.join(migrationsDir, file);
                const migrationSql = fs.readFileSync(migrationPath, 'utf8');

                await client.query(migrationSql);
                await client.query('INSERT INTO migrations (name) VALUES ($1)', [migrationName]);
            } else {
                logger.info(`Migration already executed: ${migrationName}`);
            }
        }

        await client.query('COMMIT');
        logger.info('All migrations have been successfully executed.');
    } catch (error) {
        await client.query('ROLLBACK');
        logger.error('Error executing migrations:', error);
        throw AppError.internalServer('Error occurred during database initialization');
    } finally {
        client.release();
    }
}