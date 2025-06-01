"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { useSalesStore } from "@/Stores/SalesStore";

// Registrar os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = () => {
  const { sales, updateSales } = useSalesStore();

  useEffect(() => {
    const randomSales = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 30 + 60)
    );
    updateSales(randomSales);
  }, [updateSales]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Vendas Mensais",
      },
    },
  };

  const data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril"],
    datasets: [
      {
        label: "Vendas",
        data: sales,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={data} options={options} />;
};
