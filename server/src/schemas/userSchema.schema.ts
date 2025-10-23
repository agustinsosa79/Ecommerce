import { z } from 'zod'

export const userSchema = z.object({
    name: z.string({
        message: 'name must be a string'
    })
    .min(3, 'must be at least 3 characters')
    .max(30, 'must be at most 30 characters'),

    nameUser: z.string({
        message: 'nameUser must be a string'
    })
    .min(3, 'must be at least 3 characters')
    .max(30, 'must be at most 30 characters'),

    email: z.string({
        message: 'email must be a string'
    }),

    password: z.string({
        message: 'password must be a string'
    }).min(6, 'password must be at least 6 characters')
})