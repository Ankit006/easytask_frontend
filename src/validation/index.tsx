import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type LoginFromValueType = z.infer<typeof LoginFormSchema>;

const ACCEPTED_IMAGE_TYPE = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const SignUpFormValidation = z
    .object({
        firstName: z.string().refine((data) => data !== "", {
            message: "First name is required",
        }),
        lastName: z.string().refine((data) => data !== "", {
            message: "last name is required",
        }),
        age: z.string().refine((data) => data !== "", {
            message: "age is required",
        }),
        email: z.string().email(),
        phoneNumber: z
            .string()
            .refine((value) => value.length >= 10 && value.length <= 12, {
                message: "Phone number length must be between 10 and 12 characters",
            }),
        password: z.string().min(8),
        confirmPassword: z.string(),
        profilePic: z
            .instanceof(File)
            .refine((f) => f.size < 2000000, {
                message: "Max image size is 2MB",
            })
            .refine((f) => ACCEPTED_IMAGE_TYPE.includes(f.type), {
                message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
            })
            .optional()
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password does not match",
        path: ["confirmPassword"],
    });

export type SignupValueType = z.infer<typeof SignUpFormValidation>;
