import { useEffect, useState } from "react";
import KpiCard from "../KpiCard/KpiCard";
import ProductItem from "../ProductItem/ProductItem";
import TableRow from "../TableRow/TableRow";

const Content = () => {
  const [data, setData]: any = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/data/dashboard')
    .then(res => res.json())
    .then(data => {
      setData(data);
      setLoading(false)
    })
    .catch((err) => {
      console.error("Erro na busca", err)
    })
  }, [])

  const dataDash = data?.data ?? {}

  console.log(dataDash)


  if (loading) {
    return <div>Carregando...</div>;
  }
  
  return (
    <div className="flex h-screen w-full bg-gray-950 text-white font-sans">
      <main className="flex-1 overflow-y-auto bg-gray-950 p-4 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Visão Geral</h1>
            <p className="text-gray-400 mt-1">Bem-vindo de volta! Aqui está o resumo de hoje.</p>
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
          <KpiCard title="Receita Total" value={dataDash.sales.current.totalRevenue} change={dataDash.sales.metrics.revenueGrowth.percentage} isPositive={dataDash.sales.metrics.revenueGrowth.isPositive} icon="💰" cash />
          <KpiCard title="Vendas" value={dataDash.sales.current.totalSales} change={dataDash.sales.metrics.salesGrowth.percentage} isPositive={dataDash.sales.metrics.salesGrowth.isPositive} icon="shopping_cart" />
          <KpiCard title="Ticket Médio" value={dataDash.sales.metrics.ticketGrowth.value} change={dataDash.sales.metrics.ticketGrowth.percentage} isPositive={dataDash.sales.metrics.ticketGrowth.isPositive} icon="trending_up" cash />
          <KpiCard title="Novos Clientes" value={dataDash.users_new.currentCount} change={dataDash.users_new.percentage} isPositive={dataDash.users_new.isPositive} icon="group" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico */}
          <div className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Performance de Vendas</h3>
              <span className="text-gray-400 text-sm">Atualizado há 2 min</span>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                <div key={i} className="w-full bg-blue-600/20 hover:bg-blue-500 rounded-t-sm transition-all relative group" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-700 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition">
                    {h}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Produtos */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Mais Vendidos</h3>
            <div className="space-y-4">
              {dataDash.productSales.map((product: any) => {
                return (
                  <ProductItem name={product.name} sales={product.totalQuantity} price={product.totalSales.$numberDecimal} />
                )
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
                {(dataDash.salesLast).map((sale: any) => {
                  const value = Number(sale.totalPrice?.$numberDecimal ?? sale.totalPrice ?? 0);
                  return (
                    <TableRow
                      key={sale._id}
                      id={sale._id}
                      client={sale.name}
                      date={String(sale.saleDate)}
                      status={sale.status}
                      value={value}
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