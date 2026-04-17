import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const registerSchema = z.object({
    firstName: z.string().min(2, "First name must have at least 2 characters!"),
    lastName: z.string().min(2, "Last name must have at least 2 characters!"),
    email: z.email("Invalid email format"),
    phone: z
        .string()
        .refine((value) => isValidPhoneNumber(value), {
            message: "Invalid phone number",
        }),
    password: z.string().min(6, "Password must have at least 6 characters!"),
});