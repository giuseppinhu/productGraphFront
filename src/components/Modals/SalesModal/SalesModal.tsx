import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { motion } from "framer-motion";
import { CreditCard, Plus, ShoppingBag, Trash2, X } from "lucide-react";

const SalesModal = ({ onClose }: any) => {
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    productId: '',
    quantity: 1,
    companieId: '',
    totalPrice: 0,
    price: 0,
    clientId: '',
  });

  const parsePrice = (priceObj: any) => parseFloat(priceObj?.$numberDecimal || "0");

  const handleFinishSale = async () => {
    if (!formData.clientId) return toast.warn("Selecione um cliente!");
    if (items.length === 0) return toast.warn("O carrinho está vazio!");

    try {
      const salesPromises = items.map(item => {
        const payload = {
          productId: item.productId,
          clientId: formData.clientId,
          companieId: item.companieId,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity 
        };
        
        return api.post('/sale', payload);
      });

      await Promise.all(salesPromises);

      toast.success("Venda realizada com sucesso!");
      onClose(); 
    } catch (error: any) {
      console.error(error);
      toast.error("Erro ao finalizar venda: " + (error.response?.data?.message || "Erro interno"));
    }
  };

  const addItem = () => {
    if (!formData.productId) return toast.warn("Selecione um produto!");
    if (formData.quantity < 1) return toast.warn("Quantidade mínima é 1");

    const newItem = {
      id: Date.now(),
      productId: formData.productId,
      companieId: formData.companieId,
      name: formData.name,
      price: formData.price,
      quantity: formData.quantity
    };

    setItems([...items, newItem]);
  
    const itemTotal = newItem.price * newItem.quantity;
    setTotal(prev => prev + itemTotal);

    setFormData({ ...formData, productId: '', name: '', price: 0, quantity: 1 });
  };

  const removeItem = (id: number, price: number) => {
    setItems(items.filter(i => i.id !== id));
    setTotal(prev => prev - price);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resUsers, resProducts] = await Promise.all([
          api.post('/users'), 
          api.get('/product')
        ]);
        setUsers(resUsers.data.users);
        setProducts(resProducts.data.products);
      } catch (error: any) {
        toast.error("Erro ao carregar dados: " + error.response?.data?.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
      />

      <motion.aside
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full max-w-xl bg-gray-950 border-l border-gray-800 z-[110] shadow-2xl flex flex-col"
      >
        <div className="p-8 flex-1 overflow-y-auto">
          <header className="flex justify-between items-center mb-8 text-white">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-blue-500" />
              <h2 className="text-2xl font-bold">Nova Venda</h2>
            </div>
            <X className="cursor-pointer" onClick={onClose} />
          </header>

          <div className="space-y-6">
            {/* SELECT CLIENTE */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Cliente</label>
              <select 
                className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white outline-none focus:border-blue-500"
                onChange={e => setFormData({ ...formData, clientId: e.target.value })}
              >
                <option value="">Selecione um cliente</option>
                {users?.map((u: any) => <option key={u._id} value={u._id}>{u.name}</option>)}
              </select>
            </div>

            {/* SELECT PRODUTO */}
            <div className="grid grid-cols-4 gap-4">
            {/* Select de Produto (Ocupa 3 colunas) */}
            <div className="col-span-3 space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Produto</label>
              <select 
                value={formData.productId}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white outline-none focus:border-blue-500 transition-all"
                onChange={e => {
                  const selected = products.find((p: any) => p._id === e.target.value) as any;
                  if (selected) {
                    setFormData({ 
                      ...formData, 
                      productId: selected._id, 
                      name: selected.name, 
                      price: parsePrice(selected.price),
                      companieId: selected.companieId
                    });
                  }
                }}
              >
                <option value="">Selecione um produto</option>
                {products?.map((p: any) => (
                  <option key={p._id} value={p._id}>
                    {p.name} - (R$ {parsePrice(p.price).toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            {/* Input de Quantidade (Ocupa 1 coluna) */}
            <div className="col-span-1 space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Qtd</label>
              <input 
                type="number"
                min="1"
                value={formData.quantity}
                onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

            <button onClick={addItem} className="w-full py-3 border-2 border-dashed border-gray-800 rounded-xl text-gray-500 hover:text-blue-500 flex items-center justify-center gap-2 transition-all">
              <Plus size={20} /> Adicionar ao Carrinho
            </button>

            {/* LISTA DE ITENS */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase">Carrinho</h3>
              <div className="space-y-3">
                {items.length === 0 && <p className="text-gray-600 text-center py-4">Carrinho vazio</p>}
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.quantity} x R$ {item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-blue-400 font-bold">R$ {(item.quantity * item.price).toFixed(2)}</p>
                      <Trash2 
                        className="text-gray-600 hover:text-red-500 cursor-pointer" 
                        size={18} 
                        onClick={() => removeItem(item.id, item.price)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-8 border-t border-gray-800 bg-gray-950">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-gray-500 text-sm">Total da Venda</p>
              <h3 className="text-3xl font-bold text-white">R$ {total.toFixed(2)}</h3>
            </div>
            <button 
             className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2"
             onClick={() => handleFinishSale()}
            >
              <CreditCard size={20} /> Finalizar
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default SalesModal