"use server";
import { createServerClient } from "@/lib/supabase/server";
import { Product } from "@/schemas/products";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const RemoveProducParams = z.object({
  id: z.number(),
});
type RemoveProducParams = z.infer<typeof RemoveProducParams>;

export async function removeProductAction(data: RemoveProducParams) {
  const supabase = createServerClient();

  const { error, status } = await supabase
    .from("products")
    .delete()
    .eq("id", data.id);

  if (error) {
    console.log(error);
  }

  console.log(status);

  revalidatePath("/products");
}
