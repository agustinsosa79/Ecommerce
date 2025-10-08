import {Router} from 'express'

import { registerUser, loginUser, getUser, editUser, deleteUser, getUsers } from '../controllers/users.controller.ts'
import { authMiddleware } from '../middlewares/authMiddleware.ts'

const route = Router()



route.get('/', authMiddleware, getUsers)
route.post('/register', registerUser)
route.post('/login', loginUser)
route.get('/:id', authMiddleware, getUser)
route.put('/:id', authMiddleware, editUser)
route.delete('/:id', authMiddleware, deleteUser)


export default route