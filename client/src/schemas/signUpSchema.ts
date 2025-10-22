import z from "zod";


export const signUpSchema = z.object({
    name: z.string().min(8, "El nombre es obligatorio").max(30, "El nombre es muy largo"),
    nameUser: z.string().min(8, "El nombre de usuario es obligatorio").max(30, "El nombre de usuario es muy largo"),
    email: z.string().min(10, "El email es obligatorio").max(40, "El email es muy largo"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").max(20, "La contraseña es muy larga")
})