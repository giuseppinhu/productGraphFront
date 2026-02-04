import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Save, User, Mail, Calendar, BookKey, Camera } from "lucide-react";

import { getDate } from "../../../utils/formatData";
import { toast } from "react-toastify";
import axios from "axios";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: User;
  new?: boolean;
  view?: boolean;
}

const UserModal = ({ isOpen, onClose, client, view }: UserModalProps) => {
  const [preview, setPreview] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: 0,
    created_at: "",
    avatar_url: "",
    password: "",
  });
  const [loading, setloading] = useState(false);

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      email: "",
      role: 0,
      avatar_url: "",
      created_at: "",
      password: "",
    });
  };

  useEffect(() => {
    if (client) {
      setFormData({
        id: client._id,
        name: client.name,
        email: client.email,
        role: client.role,
        created_at: client.created_at,
        avatar_url: client.avatar_url,
        password: client.password || "",
      });
      setPreview(true);
    } else {
      resetForm();
    }
  }, [client, isOpen]);

  const createUser = async (data: any) => {
    await axios
      .post("http://localhost:3000/user", {
        ...data,
        companie_id: "69701e057dcfe0d233d57009",
      })
      .then(() => {
        toast.dark("Usuario criado com sucesso!");
        resetForm();
        setPreview(false);
        onClose();
      })
      .catch((error) => {
        toast.error(`Deu erro na criação!\n\n${error.response.data.error}`);
      });
  };

  const updateUser = async (data: any) => {
    const payload = { ...data };
    if (!payload.password || String(payload.password).trim() === "") {
      delete payload.password;
    }

    await axios
      .put("http://localhost:3000/update", payload)
      .then(() => {
        toast.dark("Atualizado com sucesso!");
        setPreview(false);
        onClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          "Deu erro!" + "\n" + (error.response?.data?.error || error.message),
        );
      });
  };

  const updateAvatar = async (id: any, file: any) => {
    setloading(true);
    await axios
      .postForm("http://localhost:3000/upload", {
        file: file,
        id: id,
      })
      .then((res) => {
        if (res.data.fileUrl) {
          setloading(false);
          formData.avatar_url = res.data.fileUrl;
          toast.success("Imagem atualizada com sucesso!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
      });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
      />

      {/* Slide-over Panel */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full max-w-md bg-gray-950 border-l border-gray-800 shadow-2xl z-[70] flex flex-col"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/20">
            <div>
              <h2 className="text-xl font-bold text-white">
                {client._id.length > 0 ? "Editar Cliente" : "Novo Cliente"}
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
                {client.avatar_url != "" ? (
                  <img
                    src={client?.avatar_url}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-8 h-8 text-gray-600" />
                )}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  onChange={async (e) => {
                    if (e.target.files) {
                      let file = e.target.files[0];
                      await updateAvatar(client?._id, file);
                    }
                  }}
                  disabled={client._id.length <= 0 || view}
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

              <div className="grid grid-cols-1 gap-6">
                {/* Cargo */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Cargo
                  </label>
                  <div className="relative">
                    <BookKey className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <select
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          role: Number(e.target.value),
                        })
                      }
                      value={formData.role}
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-gray-200 outline-none focus:border-blue-500/50 transition-all"
                      disabled={view}
                    >
                      <option value={0}>Usuário</option>
                      <option value={1}>Administrador</option>
                    </select>
                  </div>
                </div>

                {/* Password */}
                {client._id.length <= 0 ? (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          });
                        }}
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-gray-200 outline-none focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
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
            {view ? (
              <></>
            ) : (
              <button
                disabled={loading}
                onClick={() => {
                  if (client._id.length > 0) {
                    updateUser(formData);
                  } else {
                    createUser(formData);
                  }
                }}
                className="disabled:opacity-50 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {client._id.length > 0
                  ? "Salvar Alterações"
                  : "Cadastrar Cliente"}
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full text-gray-500 hover:text-white py-2 transition-colors text-sm"
            >
              {view ? "Fechar" : "Cancelar"}
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default UserModal;
