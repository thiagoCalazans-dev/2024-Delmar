import { db } from "@/lib/prisma";
import { Order } from "@/schemas/order";
import { z } from "zod";

const getOrdersParams = z.object({
  page: z.string().or(z.string().array()).optional(),
  limit: z.string().or(z.string().array()).optional(),
});

type getOrdersParams = z.infer<typeof getOrdersParams>;

export async function getOrders({ page = "1", limit = "10" }: getOrdersParams) {
  try {
    //controller
    const { limit: parsedLimit, page: parsedPage } = getOrdersParams.parse({
      page,
      limit,
    });

    const skip = Number(parsedLimit) * (Number(parsedPage) - 1);
    const take = Number(parsedLimit);

    //repository
    const [dbOrders, total] = await db.$transaction([
      db.order.findMany({
        skip,
        take,
      }),
      db.order.count(),
    ]);

    const pages = Math.ceil(total / take);

    const orders = Order.array().parse(dbOrders);

    const output = {
      data: orders,
      total: total,
      pages: pages,
    };

    return output;
  } catch (error) {
    console.log(error);
  }
}
