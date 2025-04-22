import express from 'express';
import { registerUser, loginUser, deleteUser } from '../route/controllers/user.controllers.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.delete('/login/:id', deleteUser)


export default router;
