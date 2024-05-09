import { z } from "zod";
import { Product } from "./product";

const OrderSkeleton = {
  id: z.number(),
  product: Product,
  quantity: z.coerce.number().int().positive(),
  date: z.string(),
  discount: z.coerce.number().int().nonnegative().max(100),
};

export const Order = z.object(OrderSkeleton);
export type Order = z.infer<typeof Order>;
