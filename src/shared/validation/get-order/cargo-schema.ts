// validation/get-order/cargo-schema.ts
import * as z from "zod";

// Zod schema
export const cargoSchema = z.object({
  type: z
    .string()
    .nonempty("Yuk turi majburiy")
    .min(2, "Kamida 2 ta belgi bo‘lishi kerak"),
  length: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  quantity: z.string().optional(),
  weight: z.string().optional(),
  volume: z.string().optional(),
});

// TypeScript type
export type CargoType = z.infer<typeof cargoSchema>;
