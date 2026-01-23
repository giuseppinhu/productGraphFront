import { useState, useEffect } from "react";
import { X, Save, User, Mail, Calendar, BookKey, Camera } from "lucide-react";

import { getDate } from "../../utils/formatData";

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client?: User;
  view?: boolean
}

const ClientModal = ({ isOpen, onClose, client, view }: ClientModalProps) => {
  const [preview, setPreview] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: 0,
    avatar_url: "",
    created_at: "",
  });

  useEffect(() => {
    if (client) {
      setFormData(client);
      setPreview(true);
    } else {
      setFormData({
        name: "",
        email: "",
        role: 0,
        avatar_url: "",
        created_at: "",
      });
    }
  }, [client, isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-gray-950 border-l border-gray-800 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/20">
            <div>
              <h2 className="text-xl font-bold text-white">
                {client ? "Editar Cliente" : "Novo Cliente"}
              </h2>
              <p className="text-sm text-gray-500">
                Preencha as informações principais
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-800 border-2 border-dashed border-gray-700 flex items-center justify-center overflow-hidden relative group cursor-pointer">
                {preview ? (
                  <img
                    src={client?.avatar_url}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-8 h-8 text-gray-600" />
                )}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={() => console.log("fodase")}
                  disabled={view}
                />
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Clique para mudar a foto
              </p>
            </div>

            {/* Nome Completo */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-gray-200 outline-none focus:border-blue-500/50 transition-all"
                  placeholder="Ex: Joao Silva"
                  disabled={view}
                />
              </div>
            </div>

            {/* Email e Telefone */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-gray-200 outline-none focus:border-blue-500/50 transition-all"
                    placeholder="email@exemplo.com"
                    disabled={view}
                  />
                </div>
              </div>

              {/* Cargo */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Cargo
                </label>
                <div className="relative">
                  <BookKey className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <select
                    onChange={(e) =>
                      setFormData({ ...formData, role: Number(e.target.value) })
                    }
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-gray-200 outline-none focus:border-blue-500/50 transition-all"
                    disabled={view}
                  >
                    <option value={0}>Usuário</option>
                    <option value={1}>Administrador</option>
                  </select>
                </div>
              </div>

              {/* Criado */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Criado em:
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input
                    type="text"
                    value={getDate(String(client?.created_at))}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-gray-200 outline-none focus:border-blue-500/50 transition-all"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-800 bg-gray-900/20 space-y-3">
            {view ? <></>
              : <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                <Save className="w-5 h-5" />
                {client ? "Salvar Alterações" : "Cadastrar Cliente"}
              </button>
            }
            <button
              onClick={onClose}
              className="w-full text-gray-500 hover:text-white py-2 transition-colors text-sm"
            >
              {view ? "Fechar" : "Cancelar"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientModal;
