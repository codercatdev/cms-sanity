import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function PaginateList({
  num,
  limit,
  count,
}: {
  num: number;
  limit: number;
  count: number;
}) {
  const pageNumber = Number(num);
  const offset = (pageNumber - 1) * limit;
  const offsetLimit = offset + limit;
  const total = Math.ceil((count || 1) / offsetLimit);

  return (
    <div className="flex justify-between">
      <Pagination>
        <PaginationContent>
          {pageNumber > 1 && (
            <>
              <PaginationItem>
                <PaginationPrevious href={`/blog/page/${pageNumber - 1}`} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={`/blog/page/1`}>1</PaginationLink>
              </PaginationItem>
            </>
          )}
          {pageNumber > 2 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationLink href={`/blog/page/${pageNumber}`} isActive={true}>
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
          {pageNumber < total - 1 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}
          {pageNumber !== total && (
            <PaginationItem>
              <PaginationLink href={`/blog/page/${total}`}>
                {total}
              </PaginationLink>
            </PaginationItem>
          )}
          {pageNumber < total && (
            <PaginationItem>
              <PaginationNext href={`/blog/page/${pageNumber + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
