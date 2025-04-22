import { pool } from '../../dbConnection.js'

export const getProductos = async (req, res) => {
    const [ rows ] = await pool.query('SELECT * FROM Productos')
    res.json( rows )
}

export const getProductosById = async (req, res) => {
    const [ rows] = await pool.query('SELECT * FROM Productos WHERE id = ?', [req.params.id])
    
    if ( rows.length <= 0 ) return res.status(404).json({
        message: 'Miibo not found'
    })

    res.json( rows[0] )
}

export const createProductos = async (req, res) => {
    const {id, nombre, descripcion, precio, imagen_url, categoria_id, fecha_lanzamiento, stock} = req.body 
    const [rows] = await pool.query('INSERT INTO productos(id, nombre, descripcion, precio, imagen_url, categoria_id, fecha_lanzamiento, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ? )', [id, nombre, descripcion, precio, imagen_url, categoria_id, fecha_lanzamiento, stock])
    res.send({ rows })
}

export const deleteProductos =  async (req, res) => {
    const [result] = await pool.query('DELETE FROM Productos WHERE id = ?', [req.params.id])
    
    if (result.affectedRows > 0 ) return res.status(404).json({
        message: 'miibo not found'
    })

    res.sendStatus(204)
}

export const updateProductos = (req, res) => res.send ('Cambiando datos')