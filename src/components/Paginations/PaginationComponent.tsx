import { Pagination } from "@heroui/react";

export default function PaginationComponent({
  total,
  page,
  setPage,
}: {
  total: number;
  page: number;
  setPage: (page: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4 items-center mt-2">
      <Pagination
        color={"secondary"}
        page={page}
        onChange={(page) => setPage(page)}
        total={total}
      />
    </div>
  );
}
