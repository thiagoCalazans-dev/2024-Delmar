"use server";
import { db } from "@/lib/prisma";
import { Product } from "@/schemas/product";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const AddProductParams = Product.omit({ id: true });
type AddProductParams = z.infer<typeof AddProductParams>;

export async function addProduct(data: AddProductParams) {
  try {
    const parsedData = AddProductParams.parse(data);

    await db.product.create({
      data: parsedData,
    });

    revalidatePath("/products");
  } catch (error) {
    console.log(error);
  }
}
