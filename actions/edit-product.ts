"use server";
import { createServerClient } from "@/lib/supabase/server";
import { Product } from "@/schemas/products";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const EditProducParams = Product;
type EditProducParams = z.infer<typeof EditProducParams>;

export async function editProductAction(data: EditProducParams) {
  const supabase = createServerClient();

  const parsedData = EditProducParams.parse(data);

  const { error } = await supabase
    .from("products")
    .update(parsedData)
    .eq("id", data.id);

  if (error) {
    console.log(error);
  }

  revalidatePath("/products");
}
