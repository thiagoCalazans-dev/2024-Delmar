import { api } from "@/utils/supabase/client";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/products">Products</Link>
    </main>
  );
}
