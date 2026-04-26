import {z} from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid Email or Password"),
    password: z.string().min(6, "Invalid Email or Password"),
})