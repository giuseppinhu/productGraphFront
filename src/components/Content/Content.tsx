import KpiCard from "../KpiCard/KpiCard";
import ProductItem from "../ProductItem/ProductItem";
import TableRow from "../TableRow/TableRow";

const Content = () => {
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
          <KpiCard title="Receita Total" value="R$ 124.500" change="+12.5%" isPositive={true} icon="💰" />
          <KpiCard title="Vendas" value="1,240" change="+8.2%" isPositive={true} icon="shopping_cart" />
          <KpiCard title="Novos Clientes" value="350" change="-2.4%" isPositive={false} icon="group" />
          <KpiCard title="Ticket Médio" value="R$ 100,40" change="+4.1%" isPositive={true} icon="trending_up" />
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
              <ProductItem name="Fone Bluetooth Pro" sales="120 vendas" price="R$ 299" />
              <ProductItem name="Teclado Mecânico" sales="85 vendas" price="R$ 450" />
              <ProductItem name="Mouse Gamer" sales="74 vendas" price="R$ 120" />
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
                <TableRow id="#1254" client="Ana Silva" date="31 Dez, 2024" status="Concluído" value="R$ 350,00" />
                <TableRow id="#1253" client="Carlos Mendes" date="30 Dez, 2024" status="Pendente" value="R$ 120,50" />
                <TableRow id="#1253" client="Carlos Mendes" date="30 Dez, 2024" status="Cancelado" value="R$ 120,50" />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Componentes Auxiliares Tipados ---





export default Content;