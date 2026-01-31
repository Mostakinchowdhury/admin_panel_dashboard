import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Dispatch, SetStateAction } from 'react'

export function Pagi({
  page,
  setpage,
  totalpages
}: {
  page: number
  setpage: Dispatch<SetStateAction<number>>
  totalpages: number
}) {
  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => setpage((pre) => Math.max(1, pre - 1))} />
          </PaginationItem>
        )}
        {Array(totalpages)
          .fill(0)
          .map((_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink onClick={() => setpage(i + 1)}>{i + 1}</PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {page != totalpages && (
          <PaginationItem>
            <PaginationNext onClick={() => setpage((pre) => Math.min(pre + 1, totalpages))} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
