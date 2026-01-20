import { useState } from 'react';
import { Search, UserPlus, MoreHorizontal, Mail, Phone, MapPin } from 'lucide-react';

import Sidebar from '../../components/Sidebar/Sidebar';
import ClientModal from '../../components/ClientModal/ClientModal';
import ActionMenu from '../../components/ActionMenu/ActionMenu';

const ClientsPage = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-screen min-h-screen flex">
        <Sidebar />
        <div className="p-8 bg-black min-h-screen text-gray-100 w-screen">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
                    <p className="text-gray-400">
                        Gerencie e conheça seus clientes de forma eficiente.
                    </p>
                </div>
            </div>

            {/* Header com Estatísticas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                <p className="text-gray-500 text-sm font-medium">Total de Clientes</p>
                <h3 className="text-3xl font-bold mt-1">1,284</h3>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                <p className="text-gray-500 text-sm font-medium">Clientes Ativos (30d)</p>
                <h3 className="text-3xl font-bold mt-1 text-green-500">856</h3>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                <p className="text-gray-500 text-sm font-medium">Ticket Médio</p>
                <h3 className="text-3xl font-bold mt-1 text-blue-500">R$ 450,00</h3>
                </div>
            </div>

            {/* Barra de Ferramentas */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input 
                    type="text"
                    placeholder="Buscar por nome, email ou CPF..."
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                </div>
                
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all w-full md:w-auto">
                <UserPlus className="w-5 h-5" />
                Novo Cliente
                </button>
            </div>

            {/* Tabela de Clientes */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                <thead className="bg-gray-900/50 border-b border-gray-800">
                    <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Cliente</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Contato</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Total Comprado</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Última Compra</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-center">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {[1, 2, 3].map((i) => (
                    <>
                        <tr key={i} className="hover:bg-gray-800/40 transition-colors group">
                            <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold">
                                G
                                </div>
                                <div>
                                <p className="font-semibold text-gray-200">Giuseppe Silva</p>
                                <p className="text-xs text-gray-500">ID: #48293</p>
                                </div>
                            </div>
                            </td>
                            <td className="px-6 py-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Mail className="w-3.5 h-3.5" /> giuseppe@email.com
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Phone className="w-3.5 h-3.5" /> (11) 98888-8888
                                </div>
                            </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-300">
                            R$ 2.450,00
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                            15 Jan, 2026
                            </td>
                            <td className="px-6 py-4 text-center">
                                <button className="p-2 transition-all text-gray-500">
                                    <ActionMenu id="asda" url="http://localhost:3000/" onClick={() => setIsModalOpen(true)} />
                                </button>
                            </td>
                        </tr>
                        <ClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                    </>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    </div>
   
  );
};

export default ClientsPage;