import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import KpiCard from "../Dashboard/KpiCard/KpiCard";
import ProductItem from "../Dashboard/ProductItem/ProductItem";
import TableRow from "../TableRow/TableRow";
import Graphic from "../Dashboard/Graphic/Graphic";

import Loader from "../Loader/Loader";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

const Content = () => {
  const [data, setData] = useState<DashboardData>({
    data: {},
  } as DashboardData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleUpdate = () => {
      axios
        .get("http://localhost:3000/data/dashboard")
        .then((data) => {
          setData(data.data as DashboardData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erro na busca", err);
        });
    };

    handleUpdate();

    socket.on("dashboard:update", handleUpdate);

    return () => {
      socket.off("dashboard:update", handleUpdate);
    };
  }, []);

  const { data: dashboardData } = data;

  if (loading || data === null) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen w-screen bg-gray-950 text-white font-sans">
      <main className="flex-1 overflow-y-auto bg-gray-950 p-4 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Visão Geral</h1>
            <p className="text-gray-400 mt-1">
              Bem-vindo de volta! Aqui está o resumo de hoje.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm border border-gray-700 transition">
              📅 Últimos 30 dias
            </button>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-blue-500/20 transition">
              + Nova Venda
            </button>
          </div>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard
            title="Receita Total"
            value={dashboardData.sales.current.totalRevenue}
            change={dashboardData.sales.metrics.revenueGrowth.percentage}
            isPositive={dashboardData.sales.metrics.revenueGrowth.isPositive}
            icon="💰"
            cash
          />
          <KpiCard
            title="Vendas"
            value={dashboardData.sales.current.totalSales}
            change={dashboardData.sales.metrics.salesGrowth.percentage}
            isPositive={dashboardData.sales.metrics.salesGrowth.isPositive}
            icon="shopping_cart"
          />
          <KpiCard
            title="Ticket Médio"
            value={dashboardData.sales.metrics.ticketGrowth.value}
            change={dashboardData.sales.metrics.ticketGrowth.percentage}
            isPositive={dashboardData.sales.metrics.ticketGrowth.isPositive}
            icon="trending_up"
            cash
          />
          <KpiCard
            title="Novos Clientes"
            value={dashboardData.users_new.currentCount}
            change={dashboardData.users_new.percentage}
            isPositive={dashboardData.users_new.isPositive}
            icon="group"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico */}
          <div className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Performance de Vendas</h3>
              <span className="text-gray-400 text-sm">Atualizado há 2 min</span>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              <Graphic data={dashboardData.graphData} />
            </div>
          </div>

          {/* Produtos */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Mais Vendidos</h3>
            <div className="space-y-4">
              {dashboardData.productSales.map((product: ProductSale) => {
                return (
                  <ProductItem
                    key={product.name}
                    name={product.name}
                    sales={product.totalQuantity}
                    price={product.totalSales}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="mt-8 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h3 className="font-bold text-lg">Pedidos Recentes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-gray-800 text-gray-200 uppercase font-medium">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {dashboardData.salesLast.map((sale: RecentSale) => {
                  return (
                    <TableRow
                      key={sale._id}
                      id={sale._id}
                      client={sale.name}
                      date={String(sale.saleDate)}
                      status={sale.status}
                      value={sale.totalPrice}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Content;
