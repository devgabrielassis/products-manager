import { Tooltip } from "@heroui/react";
import React from "react";
import ProductView from "./ProductView";
import ProductEdit from "./ProductEdit";
import ProductDelete from "./ProductDelete";
import useSWR from "swr";
import { api } from "@/services/axios";

export default function LineProductActions({ id }: { id: string }) {
  const { data } = useSWR(`/products/${id}`, async (url: string) => {
    const response = await api.get(url);
    return response.data.data;
  });

  return (
    <div className="relative flex items-center gap-2">
      <Tooltip className="text-white" content="Detalhes">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <ProductView product={data} />
        </span>
      </Tooltip>
      <Tooltip className="text-white" content="Editar">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <ProductEdit product={data} />
        </span>
      </Tooltip>
      <Tooltip color="danger" content="Excluir">
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <ProductDelete product={data} />
        </span>
      </Tooltip>
    </div>
  );
}
