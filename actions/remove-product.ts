"use server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const RemoveProductParams = z.object({
  id: z.number(),
});
type RemoveProductParams = z.infer<typeof RemoveProductParams>;

export async function removeProductAction(data: RemoveProductParams) {
  try {
    const { id } = RemoveProductParams.parse(data);

    await db.product.delete({
      where: { id },
    });

    revalidatePath("/products");
  } catch (error) {
    console.log(error);
  }
}
