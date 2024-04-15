"use server";
import { createServerClient } from "@/lib/supabase/server";
import { Product } from "@/schemas/products";
import { z } from "zod";

const AddProductParams = Product.omit({ id: true });
type AddProductParams = z.infer<typeof AddProductParams>;

export async function addProduct(data: AddProductParams) {
  const supabase = createServerClient();

  const parsedData = AddProductParams.parse(data);

  const { error } = await supabase.from("products").insert(parsedData);

  if (error) {
    console.log(error);
  }
}
