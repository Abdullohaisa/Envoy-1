import z from "zod";

export const priceSchema = z.object({
  price: z.min(0, "Narx manfiy bo‘lishi mumkin emas"),
  currency: z.enum(["UZS", "USD", "EUR"], "Valyuta tanlanishi kerak"),
});

export type PriceType = z.infer<typeof priceSchema>;
