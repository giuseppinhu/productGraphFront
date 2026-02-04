import { useEffect, useState } from "react";
import { Search, UserPlus, Mail, Phone } from "lucide-react";
import { toast } from "react-toastify";

import UserModal from "../../components/Modals/UserModal/UserModal";
import ActionMenu from "../../components/ActionMenu/ActionMenu";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { getDate } from "../../utils/formatData";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { AnimatePresence } from "framer-motion";

const ClientsPage = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [IsView, setIsView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [data, setData] = useState<DataPage>({
    data: {
      totalNew: 0,
      dataUsers: {
        users: [
          {
            _id: "",
            name: "",
            email: "",
            role: 0,
            avatar_url: "",
            created_at: "",
          },
        ],
        totalPages: 0,
        next: false,
        totalUsers: 0,
      },
    },
  });

  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    role: 0,
    avatar_url: "",
    created_at: "",
  });

  useEffect(() => {
    axios
      .post(`http://localhost:3000/data/users?page=${page}&search=${search}`, 
        {
        companie_id: "69701e057dcfe0d233d57009",
        }
      )
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error);
        setIsLoading(true);
      });
  }, [page, search, isModalOpen, isDeleteModal]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-8 bg-gray-950 min-h-screen text-gray-100 w-screen">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
          <p className="text-gray-400">Painel para gerenciar os usuários</p>
        </div>
      </div>

      {/* Header com Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
          <p className="text-gray-500 text-sm font-medium">Total de Usuários</p>
          <h3 className="text-3xl font-bold mt-1">
            {data.data.dataUsers.users.length}
          </h3>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
          <p className="text-gray-500 text-sm font-medium">Atividade Recente</p>
          <h3 className="text-3xl font-bold mt-1 text-green-500">20</h3>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
          <p className="text-gray-500 text-sm font-medium">
            Usuários Permitidos
          </p>
          <h3 className="text-3xl font-bold mt-1 text-blue-500">{`${data.data.dataUsers.totalUsers} / 50`}</h3>
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

        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsView(false);
            setUser({
              _id: "",
              name: "",
              email: "",
              role: 0,
              avatar_url:
                "https://res.cloudinary.com/dhn5ceymi/image/upload/v1768948550/avatars/avatar_admin.png",
              created_at: String(new Date()),
            });
          }}
          disabled={data.data.dataUsers.totalUsers == 50 ? true : false}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <UserPlus className="w-5 h-5" />
          Novo Cliente
        </button>
      </div>

      {/* Tabela de Clientes */}
      <div className="bg-gray-900/30 border border-gray-800 rounded-2xl overflow-visible">
        <table className="w-full text-left">
          <thead className="bg-gray-900/50 border-b border-gray-800">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Cliente
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Contato
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Cargo
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Criado
              </th>
              <th className=" px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {data.data.dataUsers.users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-800/40 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar_url}
                      alt="User_Image"
                      className="w-10 h-10 rounded-full border border-gray-800"
                    />
                    <div>
                      <p className="font-semibold text-gray-200">{user.name}</p>
                      <p className="text-xs text-gray-500">ID: {user._id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Mail className="w-3.5 h-3.5" /> {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Phone className="w-3.5 h-3.5" /> (11) 98888-8888
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-300">
                  {user.role ? "Admin" : "Usuário"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {getDate(user.created_at)}
                </td>
                <td className="px-6 py-4 text-center">
                  <ActionMenu
                    id={user._id}
                    url="http://localhost:3000/user/"
                    onClickView={() => {
                      setUser(user);
                      setIsModalOpen(true);
                      setIsView(true);
                    }}
                    onClickDelete={() => {
                      setIsDeleteModal(true);
                      setUser(user);
                    }}
                    onClickEdit={() => {
                      setUser(user);
                      setIsModalOpen(true);
                      setIsView(false);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 flex items-center justify-between text-gray-400 text-xs">
        <span>
          Mostrando {data.data.dataUsers.users.length || 0} de{" "}
          {data.data.dataUsers.totalUsers || 0} usuários
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page === 1}
          >
            Anterior
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!data.data.dataUsers.next}
          >
            Próximo
          </button>
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        url="http://localhost:3000/user/"
        itemId={user._id}
        loading={false}
      />

      <AnimatePresence>
        {isModalOpen && (
          <UserModal
            key="user-modal"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            client={user}
            view={IsView}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientsPage;
