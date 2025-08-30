import { z } from "zod";

export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, "Email or username is required")
    .refine(
      (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        return emailRegex.test(value) || usernameRegex.test(value);
      },
      {
        message: "Please enter a valid email address or username",
      },
    ),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    emailOrUsername: z
      .string()
      .min(1, "Email or username is required")
      .refine(
        (value: string) => {
          // Check if it's an email or username
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
          return emailRegex.test(value) || usernameRegex.test(value);
        },
        {
          message:
            "Please enter a valid email address or username (3-20 characters, letters, numbers, and underscores only)",
        },
      ),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
