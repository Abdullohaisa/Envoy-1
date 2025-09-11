import z from "zod";

export const commentSchema = z.object({
  comment: z
    .string()
    .min(3, "Izoh kamida 10 ta belgidan iborat bo‘lishi kerak") // minimal belgi
    .max(400, "Izoh maksimal 300 ta belgidan oshmasligi kerak") // maksimal belgi
    .optional(),
});

export type CommentSchema = z.infer<typeof commentSchema>;
