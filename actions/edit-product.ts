"use server";
import { db } from "@/lib/prisma";
import { createServerClient } from "@/lib/supabase/server";
import { Product } from "@/schemas/product";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const EditProducParams = Product;
type EditProducParams = z.infer<typeof EditProducParams>;

export async function editProductAction(data: EditProducParams) {
  try {
    const parsedData = EditProducParams.parse(data);

    await db.product.update({
      where: {
        id: parsedData.id,
      },
      data: {
        quantity: parsedData.quantity,
        price: parsedData.price,
        cost: parsedData.cost,
      },
    });

    revalidatePath("/products");
  } catch (error) {
    console.log(error);
  }
}
