"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Spinner,
} from "@heroui/react";
import LineProductActions from "./LineProductActions";

export const columns = [
  { name: "Nome", uid: "title" },
  { name: "Descrição", uid: "description" },
  { name: "Status", uid: "status" },
  { name: "Ações", uid: "actions" },
];

// Mapeamento de status
const statusColorMap: any = {
  true: "success",
  false: "danger",
};

export default function ProductsList({ data, isLoading }: any) {
  const renderCell = React.useCallback((item: any, columnKey: any) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "title":
        return <p className="font-medium line-clamp-2">{cellValue}</p>;
      case "description":
        return (
          <p className="text-sm text-default-500 line-clamp-2">{cellValue}</p>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[item.status]}
            size="sm"
            variant="flat"
          >
            {item.status ? "Ativo" : "Inativo"}
          </Chip>
        );
      case "actions":
        return <LineProductActions id={item.id} />;
      default:
        return cellValue;
    }
  }, []);

  if (data?.data?.length === 0)
    return (
      <p className="text-center text-white text-lg mt-8">
        🛒 Nenhum produto foi cadastrado ainda.
        <br />
        Que tal começar adicionando o primeiro?
      </p>
    );

  if (isLoading) {
    return (
      <Spinner
        color="secondary"
        label="Carregando"
        labelColor="secondary"
        className="mx-auto"
      />
    );
  }

  return (
    <Table
      className="max-h-[72vh] overflow-y-auto"
      aria-label="Lista de cursos"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            className={
              column.uid === "description" ? "hidden md:table-cell" : ""
            }
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data?.data || []} isLoading={isLoading}>
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell
                className={
                  columnKey === "description" ? "hidden md:table-cell" : ""
                }
              >
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
