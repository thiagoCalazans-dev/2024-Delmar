import { api } from "@/utils/supabase/client";
import Link from "next/link";

export default async function Home() {
  const { data: products, error } = await api.from("products").select("*");
  console.log(products);

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <Link href="/">Home</Link>
      <ul>
        {products?.map((product) => {
          return <li key={product.id}>{product.name}</li>;
        })}
      </ul>
    </main>
  );
}
