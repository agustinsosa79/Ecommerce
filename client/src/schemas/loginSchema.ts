import z from "zod";


export const loginSchema = z.object({
    email: z.string().min(1, "El email es obligatorio").max(255, "El email es muy largo"),
    password: z.string().min(8, "La contraseña debe tener al menos 6 caracteres").max(20, "La contraseña es muy larga")
})