import { db } from "@/lib/prisma";
import { Product } from "@/schemas/product";
import { z } from "zod";

const getProductsParams = z.object({
  page: z.string().or(z.string().array()).optional(),
  limit: z.string().or(z.string().array()).optional(),
});

type getProductsParams = z.infer<typeof getProductsParams>;

export async function getProducts({
  page = "1",
  limit = "10",
}: getProductsParams) {
  //controller
  try {
    const { limit: parsedLimit, page: parsedPage } = getProductsParams.parse({
      page,
      limit,
    });

    const skip = Number(parsedLimit) * (Number(parsedPage) - 1);
    const take = Number(parsedLimit);

    //repository
    const [dbProducts, total] = await db.$transaction([
      db.product.findMany({
        skip,
        take,
      }),
      db.product.count(),
    ]);

    const pages = Math.ceil(total / take);

    const products = Product.array().parse(dbProducts);

    const output = {
      data: products,
      total: total,
      pages: pages,
    };

    return output;
  } catch (error) {
    console.log(error);
  }
}
