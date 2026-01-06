import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  price: z.number().positive(),
});

export type ProductInput = z.infer<typeof productSchema>;

export const createProductSchema = z.object({
  title: z.string().min(3, "Title too short"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be positive"),
  //   image: z.instanceof(File).optional(),
  image: z.custom<File | undefined>().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
