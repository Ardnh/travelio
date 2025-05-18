import * as z from "zod";

export const CategorySchema = z.object({
    name: z.string().min(3, "Minimum 3 Character"),
    description: z.string().optional(),
});