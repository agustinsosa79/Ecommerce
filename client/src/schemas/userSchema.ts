import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string({ message: "El nombre es obligatorio" })
    .min(3, { message: "Debe tener al menos 3 caracteres" })
    .max(30, { message: "Debe tener como máximo 30 caracteres" }),

  nameUser: z
    .string({ message: "El nombre de usuario es obligatorio" })
    .min(3, { message: "Debe tener al menos 3 caracteres" })
    .max(30, { message: "Debe tener como máximo 30 caracteres" }),

  email: z
    .string({ message: "El correo es obligatorio" })
    .email({ message: "Debe ser un correo válido" }),

  password: z
    .string()
    .min(6, { message: "Debe tener al menos 6 caracteres" })
    .optional(),
});
