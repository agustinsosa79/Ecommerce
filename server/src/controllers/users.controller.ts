import mongoose from "mongoose"
import user from "../models/user.model.ts"
import { userSchema } from "../schemas/userSchema.schema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { Request, Response } from "express"
import { email } from "zod"

interface authRequest extends Request {
    user: {id: string}
}



type Controller = (req: authRequest, res: Response) => Promise<Response | void>;

export const registerUser : Controller  = async (req, res) => {
    try {

        const { email } = req.body
        const emailExisting = await user.findOne({ email })
        if(emailExisting) {
            return res.status(400).json({ message: 'El email ya pertenece a un usuario'})
        }
        const parsed = userSchema.parse(req.body)
        if(!parsed) {
            return res.status(400).json({ message: 'invalid data' })
        }
        const hashedPassword = await bcrypt.hash(parsed.password, 10)
        const newUser = new user({...parsed, password: hashedPassword})
        await newUser.save()

        const {password, ...userWithoutPassword} = newUser.toObject()
        return res.status(201).json( userWithoutPassword)
    } catch (error){
        console.log(error);
        return res.status(500).json({ message: 'error al registrar el usuario' })
        
    }
}


export const loginUser: Controller = async (req, res) => {
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
        const jwtSecret = process.env.JWT_SECRET_PASSWORD as string;
        const refreshTokenSecret = process.env.REFRESH_JWT_SECRET_PASSWORD as string;
        if (!jwtSecret) {
            return res.status(500).json({ message: 'JWT secret is not defined in environment variables' });
        }
        const token = jwt.sign({id: userFound._id}, jwtSecret, { expiresIn: '1h'})
        const refreshToken = jwt.sign({id: userFound._id}, refreshTokenSecret, { expiresIn: '7d'})


        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        const { password: _, ...userData} = userFound.toObject()
        return res.status(200).json({ ...userData ,token})
    } catch (error: any) {
        return res.status(500).json({ message: 'ha ocurrido un error inesperado', error: error.message})
    }

}


export const editUser: Controller = async (req, res) => {
  try {
    const { id } = req.params;
console.log("req.body en editUser:", req.body);
    // Solo el usuario puede actualizarse a sí mismo
    if (req.user.id !== id) {
      return res.status(401).json({ message: 'No estás autorizado para esta acción' });
    }

    const { name, nameUser, email, password } = req.body;
    const updates: any = {};

    if (name) updates.name = name;
    if (nameUser) updates.nameUser = nameUser;
    if (email) updates.email = email;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updates.password = hashed;
    }

    // Si no hay cambios
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No hay cambios para guardar' });
    }

    const updatedUser = await user.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // No enviar la contraseña de vuelta
    const { password: _, ...userData } = updatedUser.toObject();
    return res.status(200).json(userData);

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
};
export const getUser : Controller = async (req, res) => {
try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID inválido" });
    }
    const userObtained = await user.findById(id)
    if(!userObtained) {
        return res.status(404).json({ message: 'el usuario no existe' })
    }
    if(req.user.id != String(userObtained._id)) {
        return res.status(401).json({ message: 'No tienes permisos para realizar esta acción' })
    } 

    const { password, ...userData } = userObtained.toObject()

    return res.status(200).json(userData)
} catch (error: any) {

    console.log(error);
    return res.status(500).json({ message: 'ah ocurrido un error al obtener el usuario', error: error.message})
}
}

export const deleteUser : Controller = async (req, res) => {
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

export const getUsers :Controller= async (req, res) => {
    try {
        const allUsers = await user.find()
            if(!allUsers){
                return res.status(401).json({ message: 'No hay usuarios' })
            }

            const userWithoutPassword = allUsers.map((u) => {
                const { password, ...data } = u.toObject()
                return data
            })

            res.status(200).json(userWithoutPassword)
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener todos los usuarios' })
    }
}


export const refreshToken: Controller = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json({ message: 'No se proporcionó un refresh token' })
        }

        const refreshTokenSecret = process.env.REFRESH_JWT_SECRET_PASSWORD as string;
        if (!refreshTokenSecret) {
            return res.status(500).json({ message: 'Refresh JWT secret is not defined in environment variables' });
        }

        const { id } = jwt.verify(refreshToken, refreshTokenSecret) as { id: string }
        const userFound = await user.findById(id)
        if (!userFound) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        const newToken = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET_PASSWORD as string, { expiresIn: '1h' })
        return res.status(200).json({ token: newToken })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ message: 'Error al refrescar el token', error: error.message })
    }
}