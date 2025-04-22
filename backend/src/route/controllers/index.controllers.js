import { pool } from '../../dbConnection.js'

export const ping = async (req, res) => {
    const [result] = await pool.query('SELECT "Pong" as Result')
    res.json(result[0])
}