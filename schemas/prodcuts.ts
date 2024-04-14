import { z } from "zod";

const ProductSkeleton = {
  id: z.number(),
  name: z.string(),
  cost: z.coerce.number(),
  category: z.string(),
  size: z.string(),
  color: z.string(),
  brand: z.string(),
  price: z.coerce.number(),
  code: z.string(),
};

export const Product = z.object(ProductSkeleton);
export type Product = z.infer<typeof Product>;
