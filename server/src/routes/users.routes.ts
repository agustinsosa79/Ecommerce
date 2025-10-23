import {Router} from 'express'

import { registerUser, loginUser, getUser, editUser, deleteUser, getUsers, refreshToken } from '../controllers/users.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const route = Router()



route.get('/', authMiddleware, getUsers)
route.post('/register', registerUser)
route.post('/login', loginUser)
route.post('/refresh', refreshToken)
route.get('/:id', authMiddleware, getUser)
route.put('/:id', authMiddleware, editUser)
route.delete('/:id', authMiddleware, deleteUser)


export default route