import { redirect } from "next/navigation";

import { createServerClient } from "@/lib/supabase/server";

import { Button } from "@/components/ui/button";
import { signOut } from "@/actions/auth";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ssr = createServerClient();

  const { data, error } = await ssr.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <form className="w-full h-20 flex justify-between px-4 items-center">
        <p>Hello {data.user.email}</p>
        <Button formAction={signOut} className="w-full">
          Sign Out
        </Button>
      </form>
      {children}
    </>
  );
}
