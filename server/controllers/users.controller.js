import user from "../models/user.model.js"
import { userSchema } from "../schemas/userSchema.schema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'




export const registerUser = async (req, res) => {
    try {

        const { email } = req.body
        const emailExisting = await user.findOne({ email })
        if(emailExisting) {
            return res.status(400).json({ message: 'El email ya pertenece a un usuario'})
        }
        const parsed = userSchema.parse(req.body)
        const hashedPassword = await bcrypt.hash(parsed.password, 10)
        const newUser = new user({...parsed, password: hashedPassword})
        await newUser.save()

        const {password, ...userWithoutPassword} = newUser._doc
        return res.status(201).json( userWithoutPassword)
    } catch (error){
        console.log(error);
        return res.status(500).json({ message: 'error al registrar el usuario' })
        
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const userFound = await user.findOne({email})
        if(!userFound) {
            return res.status(404).json({message: 'email no encontrado'})
        }
        const isValidPassword = await bcrypt.compare(password, userFound.password)
        if(!isValidPassword){
            return res.status(401).json({message: 'email o contraseña incorrecta'})
        }
        const token = jwt.sign({id: userFound._id}, process.env.JWT_SECRET_PASSWORD, { expiresIn: '1h'})
        const { password: _, ...userData} = userFound._doc
        return res.status(200).json({ ...userData ,token})
    } catch (error) {
        return res.status(500).json({ message: 'ha ocurrido un error inesperado', error: error.message})
    }

}


export const editUser  = async (req, res) => {
    try {
        const { id } = req.params
        const {name, nameUser} = req.body
        const updates = {name, nameUser}
        const updatedUser = await user.findByIdAndUpdate(id, updates, { new: true})
        if(!updatedUser) {
            return res.status(404).json({ message: 'No se ha encontrado el usuario a actualizar' })
        }
        return res.status(200).json(updatedUser)
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el usuario' })
    }

}

export const getUser = async (req, res) => {
try {
    const { id } = req.params
    if(req.user.id != id) {
        return res.status(401).json({ message: 'No tienes permisos para realizar esta acción' })
    }
    const userObtained = await user.findById(id)
    if(!userObtained) {
        return res.status(404).json({ message: 'el usuario no existe' })
    }
    return res.status(200).json(userObtained)
} catch (error) {
    return res.status(500).json({ message: 'ah ocurrido un error al obtener el usuario', error})
}
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const userToDeleted = await user.findByIdAndDelete(id)
        if(!userToDeleted) {
            return res.status(404).json({ message: 'error al obtener el usuario por eliminar' })
        }
        return res.status(200).json({ message: 'usuario eliminado correctamente' })
    } catch (error) {
        return res.status(500).json({ message: 'error al eliminar el usuario', error })
    }

}

export const getUsers = async (req, res) => {
    try {
        const allUsers = await user.find()
            if(!allUsers){
                return res.status(401).json({ message: 'No hay usuarios' })
            }

            res.status(200).json(allUsers)
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener todos los usuarios' })
    }
}