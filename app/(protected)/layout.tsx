import { redirect } from "next/navigation";

import { createServerClient } from "@/lib/supabase/server";
import { DesktopSidebar } from "@/components/sidebar/desktop";
import { MobileHeader } from "@/components/sidebar/mobile";

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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DesktopSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <MobileHeader />
        {children}
      </div>
      {/* <SiteFooter /> */}
    </div>
  );
}
