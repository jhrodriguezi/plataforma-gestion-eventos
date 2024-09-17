import fs from 'fs';
import path from 'path';

export function loadSqlQueries(fileName: string): { [key: string]: string } {
    const filePath = path.join(__dirname, '..', 'infrastructure', 'database', `${fileName}.sql`);
    const sqlFile = fs.readFileSync(filePath, 'utf8');
    const sqlQueries: { [key: string]: string } = {};
    const queryRegex = /--\s+name:\s+(\w+)\s+([\s\S]+?)(?=\n--\s+name:|$)/g;
    
    let match;
    while ((match = queryRegex.exec(sqlFile)) !== null) {
        const [, queryName, queryBody] = match;
        sqlQueries[queryName.trim()] = queryBody.trim().replace(/--.*\n/g, '');
    }

    return sqlQueries;
}

export const queries = loadSqlQueries('queries');