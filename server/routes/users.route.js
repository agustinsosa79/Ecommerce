import {Router} from 'express'

import { registerUser, loginUser, getUser, editUser, deleteUser, getUsers } from '../controllers/users.controller.js'

const route = Router()



route.get('/', getUsers)
route.post('/register', registerUser)
route.post('/login', loginUser)
route.get('/:id', getUser)
route.put('/:id', editUser)
route.delete('/:id', deleteUser)

export default route