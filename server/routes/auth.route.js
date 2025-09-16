import Router from 'express';
import { login, logout, register, refreshToken } from '../controllers/authController.controller.js';


const router = Router();



router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)
router.post('/refresh-token', refreshToken)


export default router;