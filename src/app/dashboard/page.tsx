"use client";
import PaginationComponent from "@/components/Paginations/PaginationComponent";
import ProductCreate from "@/components/Partials/ProductCreate";
import ProductsList from "@/components/Partials/ProductsList";
import { api } from "@/services/axios";
import React from "react";
import useSWR from "swr";

export default function Page() {
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useSWR(
    `/products?page=${page}`,
    async (url: string) => {
      const response = await api.get(url);
      return response.data;
    }
  );

  return (
    <main className="h-screen dark flex items-center">
      <div className="md:border max-w-[96vw] md:max-3-xl md:p-8 mx-auto md:bg-black/80 rounded-xl">
        <h3 className="font-bold text-white mb-2">
          <div className="flex flex-row justify-between items-center mb-3 gap-20">
            <h2 className="font-bold text-2xl">Produtos</h2>
            <ProductCreate />
          </div>
          <ProductsList data={data} isLoading={isLoading} />
          {data?.meta?.totalPages > 0 && (
            <PaginationComponent
              page={page}
              setPage={setPage}
              total={data.meta.totalPages}
            />
          )}
        </h3>
      </div>
    </main>
  );
}
