import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { pool } from '../../dbConnection.js';

const JWT_SECRET = 'tu_secreto_aqui'; // Reemplaza por una clave secreta segura

// Función para hashear contraseñas
const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
};

// Función para verificar contraseñas
const verifyPassword = (password, hashedPassword) => {
    const [salt, originalHash] = hashedPassword.split(':');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === originalHash;
};

// Controlador para registrar usuarios
export const registerUser = async (req, res) => {
    const { nombre_usuario, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const [existingUser] = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        // Encriptar la contraseña
        const hashedPassword = hashPassword(password);

        // Insertar el nuevo usuario con la contraseña encriptada
        const [result] = await pool.query(
            'INSERT INTO Usuarios (nombre_usuario, email, password) VALUES (?, ?, ?)',
            [nombre_usuario, email, hashedPassword]
        );

        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// Controlador para loguear usuarios
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const [user] = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado o credenciales incorrectas' });
        }

        // Verificar la contraseña
        const isPasswordValid = verifyPassword(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Generar el token JWT
        const token = jwt.sign({ userId: user[0].id, email: user[0].email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// Middleware para verificar el token
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.userId = decoded.userId; // Agregar userId al objeto de la petición
        next();
    });
};

// Controlador para eliminar un usuario por su ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Eliminar el usuario de la base de datos
        const [result] = await pool.query('DELETE FROM Usuarios WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};
