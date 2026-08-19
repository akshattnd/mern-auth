import z from "zod";

export const registerUserSchema = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string().min(8),
});

export const loginUserSchema = z
  .object({
    username: z.string().optional(),
    email: z.email().optional(),
    password: z.string().min(8),
  })
  .refine((data) => data.email || data.username, {
    message: "Either username or email is required",
    path: ["username"],
  });

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8)
})