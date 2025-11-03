import { z } from "zod";

export const emailLoginSchema = z.object({
  email: z.string().email({ message: "Email noto‘g‘ri kiritildi" }),
  password: z.string().min(8, { message: "Parolni to‘liq kiriting" }),
});

export type EmailLoginSchemaType = z.infer<typeof emailLoginSchema>;

export const phoneLoginSchema = z.object({
  phone: z
    .string()
    .nonempty("Telefon raqamni kiriting")
    .refine((val) => val.replace(/\D/g, "").length === 9, {
      message: "Telefon raqamni to‘liq kiriting",
    }),
  password: z.string().min(8, { message: "Parolni to‘liq kiriting" }),
});

export type PhoneLoginSchemaType = z.infer<typeof phoneLoginSchema>;

export const phoneSchema = () =>
  z.object({
    phone: z.string().refine((val) => val.length >= 12, {
      message: "Telefon raqam kiriting",
    }),
  });

export type PhoneSchemaType = z.infer<ReturnType<typeof phoneSchema>>;

export const newPasswordSchema = () =>
  z
    .object({
      password: z
        .string()
        .min(8, { message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak" })
        .regex(/[A-Z]/, { message: "Kamida bitta katta harf" })
        .regex(/[a-z]/, { message: "Kamida bitta kichkia harf" })
        .regex(/\d/, { message: "Kamida bitta raqam" }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Parollar mos emas",
      path: ["confirmPassword"],
    });

export type NewPasswordSchemaType = z.infer<
  ReturnType<typeof newPasswordSchema>
>;

export const registerSchemaStep1 = () =>
  z.object({
    name: z.string().min(2, "Ism majburiy"),
  });

export type RegisterSchemaStep1 = z.infer<
  ReturnType<typeof registerSchemaStep1>
>;

export const registerSchemaStep2 = () =>
  z
    .object({
      password: z
        .string()
        .min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Parollar mos emas",
      path: ["confirmPassword"],
    });

export type RegisterSchemaStep2 = z.infer<
  ReturnType<typeof registerSchemaStep2>
>;
