import * as z from "zod";

export const ArticleSchema = z.object({
    title: z.string().min(3, "Minimal 3 karakter"),
    description: z.string().optional(),
    cover_image_url: z.string().optional(),
    category: z.string().optional()
});

