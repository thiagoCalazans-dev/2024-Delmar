import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";

import { getProducts } from "@/actions/get-products";
import { TablePagination } from "../ui/table-pagination";
import { formatCurrencyTo } from "@/helpers/currency-format";
import { Separator } from "../ui/separator";
import { EditProductModal } from "../modals/form-edit-product-modal";
import { RemoveProductModal } from "../modals/remove-product-modal";

export async function ProductTable({ limit, page }: any) {
  const { data, pages, total } = await getProducts({ limit, page });

  return (
    <>
      {/* MOBIlE */}
      <Separator />
      {data.map((item) => {
        return (
          <div key={item.id} className="block sm:hidden ">
            <div className="py-2">
              <span className="">{item.name}</span>
              <div className="w-full flex justify-between items-center text-sm">
                <span className=" text-muted-foreground">{item.code}</span>
                <Badge>{item.size}</Badge>
              </div>
              <div className="w-full text-sm flex justify-between items-center">
                <div>
                  Amount:
                  <span className="pl-2 font-semibold text-primary">
                    {item.quantity}
                  </span>
                </div>
                <span className="font-semibold text-primary">
                  €: {item.price}
                </span>
              </div>
            </div>
            <Separator />
          </div>
        );
      })}
      {/* DESKTOP */}
      <Table className="hidden sm:table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead className="hidden lg:table-cell">Category</TableHead>
            <TableHead className="hidden lg:table-cell">Size</TableHead>
            <TableHead className="hidden lg:table-cell">Brand</TableHead>
            <TableHead className="hidden lg:table-cell">Color</TableHead>
            <TableHead className="hidden md:table-cell">Cost</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.code}</Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {item.category}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {item.size}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {item.brand}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {item.color}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatCurrencyTo.Real(item.cost)}
                </TableCell>
                <TableCell className="font-medium">
                  {formatCurrencyTo.Real(item.price)}
                </TableCell>
                <TableCell className="font-medium">{item.quantity}</TableCell>
                <TableCell className="flex gap-4">
                  <EditProductModal product={item} />
                  {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <EditProductModal product={item} />
                      </DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> */}
                  <RemoveProductModal id={item.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination params="products" total={total} pages={pages} />
    </>
  );
}
