"use server";

import { api } from "@/lib/supabase/client";
import { createServerClient } from "@/lib/supabase/server";

export async function addProduct(data: any) {
  const supabase = createServerClient();
  const { error } = await supabase.from("products").insert(data);

  if (error) {
    console.log(error);
  }
}
