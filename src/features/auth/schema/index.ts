import { z } from "zod"

export const loginSchema = z.object({
    identifier: z.string().nonempty({ message: "Identifier is required" }),
    password: z.string().min(5, {
        message: "Password at leaset 5 character"
    })
})

export const registerSchema = z.object({
    email: z.string().nonempty({ message: "Email is required" }).email({
        message: "invalid email format"
    }),
    username: z.string().nonempty({ message: "Username is required" }),
    password: z.string().min(5, {
        message: "Password at leaset 5 character"
    })
})