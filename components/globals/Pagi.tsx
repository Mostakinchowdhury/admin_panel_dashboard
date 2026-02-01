import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Dispatch, SetStateAction } from 'react';

export function Pagi({
  page,
  setpage,
  totalpages,
}: {
  page: number;
  setpage: Dispatch<SetStateAction<number>>;
  totalpages: number;
}) {
  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              href="#"
              onClick={e => {
                e.preventDefault();
                setpage(pre => Math.max(1, pre - 1));
              }}
            />
          </PaginationItem>
        )}
        {Array(totalpages)
          .fill(0)
          .map((_, i) => (
            <PaginationItem key={i + 1} className="cursor-pointer">
              <PaginationLink
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setpage(i + 1);
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {page != totalpages && (
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              href="#"
              onClick={e => {
                e.preventDefault();
                setpage(pre => Math.min(pre + 1, totalpages));
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
