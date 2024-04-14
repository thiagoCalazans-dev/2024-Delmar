"use client";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "./button";

interface TablePaginationProps {
  total: number;
  pages: number;
  params: string;
}

export function TablePagination({
  total,
  pages,
  params,
}: TablePaginationProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";
  const hasPrevPage = Number(page) > 1;
  const hasNextPage = Number(page) < pages;
  const totalPages = Math.ceil(total / Number(limit));

  return (
    <Pagination>
      <PaginationContent className="flex justify-between w-full pt-2">
        <span className="text-muted-foreground text-sm">{`${pages} of ${totalPages}`}</span>
        <div className="flex gap-4">
          <PaginationItem className="w-0 bg-red-500">
            <Button disabled={!hasPrevPage} variant="link">
              <PaginationPrevious
                href={`/${params}/?page=${Number(page) - 1}&limit=${limit}`}
              />
            </Button>
          </PaginationItem>
          <PaginationItem></PaginationItem>
          <PaginationItem>
            <Button disabled={!hasNextPage} variant="link">
              <PaginationNext
                href={`/${params}?page=${Number(page) + 1}&limit=${limit}`}
              />
            </Button>
          </PaginationItem>
        </div>
      </PaginationContent>
    </Pagination>
  );
}
