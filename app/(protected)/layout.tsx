import { redirect } from "next/navigation";

import { createServerClient } from "@/utils/supabase/server";

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
      <p>Hello {data.user.email}</p>
      {children}
    </>
  );
}
