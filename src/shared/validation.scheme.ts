import { z } from "zod";

export const loginSchema = () =>
  z.object({
    phone: z.string().refine((val) => val.length >= 12, {
      message: "Telefon raqamni to'liq kiritng",
    }),
    password: z.string().refine((val) => val.length >= 6, {
      message: "Parolni to'liq kiriting",
    }),
  });

export type LoginSchemaType = z.infer<ReturnType<typeof loginSchema>>;

export const phoneSchema = () =>
  z.object({
    phone: z.string().refine((val) => val.length >= 12, {
      message: "telefon",
    }),
  });

export type PhoneSchemaType = z.infer<ReturnType<typeof phoneSchema>>;
