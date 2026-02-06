import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { toast } from "react-toastify";

import Loader from "../../components/Loader/Loader";
import ActionMenu from "../../components/ActionMenu/ActionMenu";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import ProductModal from "../../components/Modals/ProductModal/ProductModal";

import formatPrice from "../../utils/formatPrice";
import { subString } from "../../utils/sliceString";
import { api } from "../../services/api";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [IsView, setIsView] = useState(false);
  const [data, setData] = useState<RootProductResponse>({
    product: [],
    totalDoc: 0,
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState({});
  const [companieId, setCompanieId] = useState("");

  useEffect(() => {
    api
      .post(
        `/data/product?page=${page}&search=${search}`
      )
      .then((res: any) => {
        setData(res.data);
        setCompanieId(res.data.companieId);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Erro Interno!");
      });
  }, [search, isModalOpen]);

  if (loading || data === null || data === undefined) {
    return <Loader />;
  }

  const products = data.product[0]?.data || [];
  const metadata = data.product[0]?.metadata[0] || {
    total: 0,
    totalQuantity: 0,
    totalPrice: 0,
  };

  return (
    <div className="p-8 bg-gray-950 w-full min-h-screen text-gray-100">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="text-gray-400">Painel para gerenciar os produtos</p>
        </div>
      </div>

      {/* Header & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl">
          <p className="text-gray-500 text-sm">Total de Itens</p>
          <h3 className="text-3xl font-bold mt-1">{data.totalDoc}</h3>
        </div>
        <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl">
          <p className="text-gray-500 text-sm">
            {metadata.totalQuantity < 100 ? "Baixo Estoque" : "Alto Estoque"}
          </p>
          <h3
            className={`text-3xl font-bold mt-1 ${metadata.totalQuantity < 100 ? "text-amber-500" : "text-green-400"}`}
          >
            {metadata.totalQuantity}
          </h3>
        </div>
        <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl">
          <p className="text-gray-500 text-sm">Valor em Estoque</p>
          <h3 className="text-3xl font-bold mt-1 text-blue-500">
            {formatPrice(metadata.total)}
          </h3>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            placeholder="Buscar produto ou SKU..."
            className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            setProduct({
              id: "",
              name: "",
              price: 0,
              quantity: 0,
              categorie: "",
              description: "",
              companieId: companieId,
              product_url:
                "https://res.cloudinary.com/dhn5ceymi/image/upload/v1769785236/caixa_ipbl5e.png",
            });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all w-full md:w-auto"
        >
          <Plus size={20} /> Novo Produto
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-900/20 border border-gray-800 rounded-2xl">
        <table className="w-full text-left">
          <thead className="bg-gray-900/50 border-b border-gray-800 text-gray-500 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Produto</th>
              <th className="px-6 py-4">Categoria</th>
              <th className="px-6 py-4">Preço</th>
              <th className="px-6 py-4">Estoque</th>
              <th className="px-6 py-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 ">
            {products.map((product: any) => (
              <tr
                className="hover:bg-gray-800/30 transition-colors"
                key={product._id}
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-gray-200">
                      #{subString(product._id)}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                      <img
                        src={product.product_url}
                        className="w-full h-full object-cover"
                        alt="Produto"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        SKU: {product.SKU}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {product.categorie}
                </td>
                <td className="px-6 py-4 font-medium text-gray-200">
                  {formatPrice(product.price)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${product.quantity > 10 ? "bg-green-500" : "bg-amber-500"}`}
                    ></span>
                    <span className="text-sm text-gray-300">
                      {product.quantity} unidades
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <ActionMenu
                    id={product._id}
                    url="http://localhost:3000/product"
                    onClickView={() => {
                      setProduct(product);
                      setIsModalOpen(true);
                      setIsView(true);
                    }}
                    onClickDelete={() => {
                      setIsDeleteModal(true);
                      setProduct(product);
                    }}
                    onClickEdit={() => {
                      setProduct(product);
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

      <DeleteModal
        isOpen={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        url="http://localhost:3000/product/"
        itemId={product._id}
        loading={false}
      />

      {/* MODAL COM ANIMACAO DE SAIDA */}
      <AnimatePresence>
        {isModalOpen && (
          <ProductModal
            key="product-modal"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            product={product}
            view={IsView}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
