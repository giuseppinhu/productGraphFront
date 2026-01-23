import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import formatPrice from "../../utils/formatPrice";
import { subString } from "../../utils/sliceString";
import { getDate } from "../../utils/formatData";

import ModernSalesSkeleton from "../../components/Loader/Loader";
import StatusBadge from "../../components/StatusBadge/StatusBadge";

const Sales = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [data, setData] = useState<Sale>({
    sales: [],
    budges: { totalRevenue: 0, quantity: 0 },
    AUR: 0,
    totalPages: 0,
    total: 0,
    next: false,
  });
  const [loading, setLoading] = useState(true);

  const pasteId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.info("ID copiado para a área de transferência!");
  };

  useEffect(() => {
    fetch(
      `http://localhost:3000/data/sales?page=${page}&search=${searchTerm}&status=${status}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar as vendas", err);
      });
  }, [page, searchTerm, status]);

  if (loading) {
    return <ModernSalesSkeleton />;
  }

  return (
    <>
      <div className="p-10 bg-gray-950 text-white w-full min-h-screen">
        {/* Header da Página */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vendas</h1>
            <p className="text-gray-400">
              Gerencie e monitore todas as transações da sua conta.
            </p>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
            disabled
          >
            Exportar Relatório (CSV)
          </button>
        </div>

        {/* Mini Stats de Vendas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-sm">Vendas (7 dias)</p>
            <h3 className="text-2xl font-bold">{data.budges.quantity}</h3>
          </div>
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-sm">Faturamento (7 dias)</p>
            <h3 className="text-2xl font-bold text-green-400">
              {formatPrice(data.budges.totalRevenue)}
            </h3>
          </div>
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-sm">
              Proporção de Usuários Ativos
            </p>
            <h3 className="text-2xl font-bold text-blue-400">{data.AUR}</h3>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-800 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                🔍
              </span>
              <input
                type="text"
                placeholder="Buscar por cliente, e-mail ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-950 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div className="flex gap-2">
              <select
                className="bg-gray-950 border border-gray-700 text-sm rounded-lg px-3 py-2 outline-none"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={" "}>Todos os produtos</option>
                <option value={"completed"}>Completo</option>
                <option value={"pending"}>Pendente</option>
                <option value={"canceled"}>Cancelado</option>
              </select>
            </div>
          </div>

          {/* Tabela de Vendas */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-800/50 text-gray-400 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Produto</th>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Valor</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {(data.sales || []).map((sale: SalesData) => (
                  <>
                    <tr
                      key={sale._id}
                      className="hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-blue-400">
                        <span
                          className="flex items-center gap-2"
                          onClick={() => pasteId(sale._id)}
                          style={{ cursor: "pointer" }}
                        >
                          #{subString(sale._id)}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="Layer_1"
                            height="20"
                            viewBox="0 0 24 24"
                            width="20"
                            data-name="Layer 1"
                            fill="oklch(70.7% 0.165 254.624)"
                          >
                            <path d="m13 20a5.006 5.006 0 0 0 5-5v-8.757a3.972 3.972 0 0 0 -1.172-2.829l-2.242-2.242a3.972 3.972 0 0 0 -2.829-1.172h-4.757a5.006 5.006 0 0 0 -5 5v10a5.006 5.006 0 0 0 5 5zm-9-5v-10a3 3 0 0 1 3-3s4.919.014 5 .024v1.976a2 2 0 0 0 2 2h1.976c.01.081.024 9 .024 9a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3-3zm18-7v11a5.006 5.006 0 0 1 -5 5h-9a1 1 0 0 1 0-2h9a3 3 0 0 0 3-3v-11a1 1 0 0 1 2 0z" />
                          </svg>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">
                          {sale.clientData.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {sale.productData.name}
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {getDate(sale.saleDate)}
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        {formatPrice(sale.totalPrice)}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={sale.status} />
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação Simples */}
          <div className="p-4 border-t border-gray-800 flex items-center justify-between text-gray-400 text-xs">
            <span>
              Mostrando {data.sales?.length || 0} de {data.total || 0} vendas
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
                disabled={page === 1}
              >
                Anterior
              </button>
              <button
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
                disabled={!data.next}
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Sales;
