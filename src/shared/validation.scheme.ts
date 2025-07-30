import { z } from "zod";

export const loginSchema = () =>
  z.object({
    phone: z.string().refine((val) => val.length >= 12, {
      message: "telefon",
    }),
    password: z.string().refine((val) => val.length >= 6, {
      message: "parol",
    }),
  });

export type LoginSchemaType = z.infer<ReturnType<typeof loginSchema>>;
