import { create } from "zustand";

type SalesStore = {
  sales: number[];
  updateSales: (data: number[]) => void;
};

export const useSalesStore = create<SalesStore>((set) => ({
  sales: [],
  updateSales: (data) => set({ sales: data }),
}));
