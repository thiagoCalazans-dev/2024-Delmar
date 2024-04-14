import { api } from "@/lib/supabase/client";
import { createServerClient } from "@/lib/supabase/server";
import { Product } from "@/schemas/prodcuts";

type getProductsParams = {
  page?: string | string[];
  limit?: string | string[];
};

export async function getProducts({ page, limit }: getProductsParams) {
  const currentPage = Number(page) || 1;
  const currentLimit = Number(limit) || 10;
  const startIndex = (currentPage - 1) * currentLimit;
  const endIndex = currentPage * currentLimit - 1;

  const { data, error, count } = await api
    .from("products")
    .select("*", { count: "exact" })
    .order("name", { ascending: false })
    .range(startIndex, endIndex);

  if (error) throw new Error("Failed to fetch data");

  const parsedData = Product.array().safeParse(data);

  if (!parsedData.success)
    throw new Error("Failed to parse products from database");

  const products = parsedData.data;
  const total = count || products.length;
  const pages = Math.ceil(total / currentLimit);

  return { pages, total, data: products };
}
