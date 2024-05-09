import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductTable } from "@/components/tables/products-table";
import { NewProductModal } from "@/components/modals/form-new-product-modal";
import { Search } from "lucide-react";
import { OrderTable } from "@/components/tables/orders-table";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="flex-1 items-start space-y-4 p-4 sm:px-6 sm:py-0 md:gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative  w-full ">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:max-w-[200px] lg:max-w-[336px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <NewProductModal />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Manage your sales.</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderTable />
        </CardContent>
      </Card>
    </main>
  );
}
