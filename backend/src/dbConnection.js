import { createPool } from "mysql2/promise"

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'fincacruzpiedra2006',
    port: 3306,
    database: 'miibodb'
})
