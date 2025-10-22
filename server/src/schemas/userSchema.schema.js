import { z } from 'zod'

export const userSchema = z.object({
    name: z.string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string'
    })
    .min(3, 'must be at least 3 characters')
    .max(30, 'must be at most 30 characters'),

    nameUser: z.string({
        required_error: 'nameUser is required',
        invalid_type_error: 'nameUser must be a string'
    })
    .min(3, 'must be at least 3 characters')
    .max(30, 'must be at most 30 characters'),

    email: z.string({
        required_error: 'email is required',
        invalid_type_error: 'email must be a string'
    }),

    password: z.string({
        required_error: 'password is required',
        invalid_type_error: 'password must be a string'
    }).min(6, 'password must be at least 6 characters')
})