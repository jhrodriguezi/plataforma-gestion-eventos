import { Pool } from "pg";
import fs from 'fs';
import path from 'path';

export async function runMigrations(pool: Pool) {
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
            console.log(`Base de datos '${database}' creada.`);
        } else {
            console.log(`Base de datos '${database}' ya existe.`);
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
                console.log(`Ejecutando migración: ${migrationName}`);

                const migrationPath = path.join(migrationsDir, file);
                const migrationSql = fs.readFileSync(migrationPath, 'utf8');

                await client.query(migrationSql);
                await client.query('INSERT INTO migrations (name) VALUES ($1)', [migrationName]);
            } else {
                console.log(`Migración ya ejecutada: ${migrationName}`);
            }
        }

        await client.query('COMMIT');
        console.log('Todas las migraciones se han ejecutado con éxito.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error al ejecutar las migraciones:', error);
        throw error;
    } finally {
        client.release();
    }
}