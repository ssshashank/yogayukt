import { z } from "zod";

export const loginSchema = z?.object({
	email: z
		.string()
		.email({ message: "Invalid email address" })
		.trim()
		.toLowerCase(),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters long" })
		.regex(/[A-Z]/, {
			message: "Password must include at least one uppercase letter",
		})
		.regex(/[0-9]/, { message: "Password must include at least one number" })
		.regex(/[^a-zA-Z0-9]/, {
			message: "Password must include at least one special character",
		}),
});

export type LoginFormType = z.infer<typeof loginSchema>;

export const signupSchema = z?.object({
	username: z.string().min(1, "Full name is required").max(50).trim(),
	email: z
		.string()
		.email({
			message: "Invalid email address",
		})
		.trim()
		.toLowerCase(),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters long" })
		.regex(/[A-Z]/, {
			message: "Password must include at least one uppercase letter",
		})
		.regex(/[0-9]/, { message: "Password must include at least one number" })
		.regex(/[^a-zA-Z0-9]/, {
			message: "Password must include at least one special character",
		}),
	role: z.string().nonempty({ message: "Please select a role." }),
});

export type SignupFormType = z.infer<typeof signupSchema>;

export const verifyOTPSchema = z?.object({
	otp: z
		.array(
			z.string().length(1, { message: "Each digit must be a single character" })
		)
		.length(6, { message: "OTP must be 6 digits" }),
});

export type VerifyOTPFormType = z.infer<typeof verifyOTPSchema>;
