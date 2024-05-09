import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { TablePagination } from "../ui/table-pagination";
import { formatCurrencyTo } from "@/helpers/currency-format";
import { Separator } from "../ui/separator";
import { getOrders } from "@/actions/get-orders";

export async function OrderTable({ limit, page }: any) {
  const { data, pages, total } = await getOrders({ limit, page });

  return (
    <>
      {/* MOBIlE */}
      <Separator />
      {/* DESKTOP */}
      <Table className="hidden sm:table">
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden lg:table-cell">Date</TableHead>
            <TableHead className="hidden lg:table-cell">Quantity</TableHead>
            <TableHead className="hidden lg:table-cell">Price</TableHead>
            <TableHead className="hidden lg:table-cell">Discount</TableHead>
            <TableHead className="hidden md:table-cell">Total</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>
                  <Badge variant="outline">{item.product.code}</Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {item.product.name}
                </TableCell>
                <TableCell className="font-medium">
                  {new Intl.DateTimeFormat("pt-BR").format(new Date(item.date))}
                </TableCell>
                <TableCell className="font-medium">{item.quantity}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatCurrencyTo.Real(item.product.price)}
                </TableCell>
                <TableCell className="font-medium">{item.discount}%</TableCell>
                <TableCell className="font-medium">
                  {formatCurrencyTo.Real(
                    item.product.price -
                      (item.product.price * item.discount) / 100
                  )}
                </TableCell>
                <TableCell className="flex gap-4">
                  botao
                  {/* <EditOrderModal product={item} /> */}
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
                        <EditOrderModal product={item} />
                      </DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> */}
                  {/* <RemoveOrderModal id={item.id} /> */}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination params="orders" total={total} pages={pages} />
    </>
  );
}
