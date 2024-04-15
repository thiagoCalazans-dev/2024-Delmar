import { z } from "zod";

const ProductSkeleton = {
  id: z.number(),
  name: z.string(),
  code: z.string(),
  cost: z.coerce
    .number()
    .positive("o valor deve ser positivo")
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "O valor deve ter no máximo duas casas decimais", // O Euro permite até duas casas decimais
    }),
  category: z.string(),
  size: z.string(),
  color: z.string(),
  brand: z.string(),
  price: z.coerce
    .number()
    .positive("o valor deve ser positivo")
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "O valor deve ter no máximo duas casas decimais", // O Euro permite até duas casas decimais
    }),
  quantity: z.coerce.number().int().nonnegative(),
};

export const Product = z.object(ProductSkeleton);
export type Product = z.infer<typeof Product>;
