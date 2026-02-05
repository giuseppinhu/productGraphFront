import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Save, Image as ImageIcon } from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../../../../api";

const ProductModal = ({ onClose, product, view }: any) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: 0,
    quantity: 0,
    categorie: "",
    description: "",
    product_url: "",
    companieId: "",
  });

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      price: 0,
      quantity: 0,
      categorie: "",
      description: "",
      product_url: "",
      companieId: "",
    });
  };

  useEffect(() => {
    if (product) {
      setFormData({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        categorie: product.categorie,
        description: product.description,
        product_url: product.product_url,
        companieId: product.companieId,
      });
    } else {
      resetForm();
    }
  }, [product]);

  const create = (data: any) => {
    api
      .post("/product", data)
      .then((res) => {
        onClose();
        toast.success("Criado com sucesso!");
      })
      .catch((error) => {
        toast.error("Deu erro! \n" + error.response.data.message);
      });
  };

  const updateProduct = async (data: any) => {
    const payload = { ...data };
    if (!payload.password || String(payload.password).trim() === "") {
      delete payload.password;
    }

    await api
      .put("/product", payload)
      .then(() => {
        toast.dark("Atualizado com sucesso!");
        onClose();
      })
      .catch((error) => {
        toast.error(
          "Deu erro!" +
            "\n" +
            (error.response?.data?.error || error.response.data.message),
        );
      });
  };

  const updateImage = (file: File) => {
    axios
      .postForm("http://localhost:3000/product/upload", {
        id: product._id,
        file: file,
      })
      .then((res) => {
        formData.product_url = res.data.fileUrl;
        toast.success("Imagem atualizada com sucesso!");
      })
      .catch((error) => {
        toast.error("Deu erro! \n" + error.response.data.message);
      });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
      />

      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full max-w-lg bg-gray-950 border-l border-gray-800 z-[110] shadow-2xl flex flex-col"
      >
        <div className="p-8 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-white">
              {view
                ? "Informações Principais"
                : product._id?.length > 0
                  ? "Editar Produto"
                  : "Cadastrar Produto"}
              <p className="text-sm text-gray-500 block">
                {view
                  ? "Visualize as infomarções dos produtos"
                  : "Preencha as informações principais"}
              </p>
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full text-gray-400"
            >
              <X size={24} />
            </button>
          </div>

          <form className="space-y-6">
            {/* Upload de Imagem */}
            <div className="relative w-full h-48 bg-gray-900 border-2 border-dashed border-gray-800 rounded-2xl flex flex-col items-center justify-center gap-3 group cursor-pointer hover:border-blue-500/50 transition-all">
              {product.product_url ? (
                <img
                  src={product.product_url}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <ImageIcon
                    className="text-gray-600 group-hover:text-blue-500"
                    size={32}
                  />
                  <p className="text-sm text-gray-500">
                    Clique para enviar imagem do produto
                  </p>
                </>
              )}
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                onChange={async (e) => {
                  if (e.target.files) {
                    let file = e.target.files[0];
                    await updateImage(file);
                  }
                }}
                disabled={product?._id?.length < 0 || view}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Nome do Produto
              </label>
              <input
                className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 outline-none focus:border-blue-500 text-white disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Ex: Macbook Pro M3"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                value={formData.name}
                disabled={view}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Preço de Venda
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    R$
                  </span>
                  <input
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 pl-10 outline-none focus:border-blue-500 text-white disabled:cursor-not-allowed disabled:opacity-60"
                    placeholder="0,00"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    value={formData.price}
                    disabled={view}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    ,00
                  </span>
                </div>
              </div>
              <div className="relative">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Estoque Inicial
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 outline-none focus:border-blue-500 text-white disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="0"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: Number(e.target.value),
                    })
                  }
                  value={formData.quantity}
                  disabled={view}
                />
                <span className="absolute right-3 top-2/3 -translate-y-1/2 text-gray-500 text-sm">
                  uni.
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Categoria
              </label>
              <select
                className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 outline-none focus:border-blue-500 text-white appearance-none disabled:opacity-60"
                onChange={(e) =>
                  setFormData({ ...formData, categorie: e.target.value })
                }
                value={formData.categorie}
                disabled={view}
              >
                <option selected value="none" disabled>
                  Selecione:
                </option>
                <option value="electronic">Eletrônicos</option>
                <option value="accessories">Acessórios</option>
                <option value="software">Softwares</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Descrição
              </label>
              <textarea
                className="w-full h-20 bg-gray-900 border border-gray-800 rounded-xl p-3 outline-none focus:border-blue-500 text-white resize-none  disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Descrição do produto"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                value={formData.description}
                disabled={view}
              />
            </div>
          </form>
        </div>

        <div className="p-8 border-t border-gray-800 bg-gray-900/20">
          {view ? (
            <button
              onClick={() => onClose()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
            >
              Fechar
            </button>
          ) : (
            <button
              onClick={() => {
                if (product?._id?.length > 0) {
                  updateProduct(formData);
                } else {
                  create(formData);
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Salvar Produto
            </button>
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default ProductModal;
