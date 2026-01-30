import { motion } from 'framer-motion';
import { X, Save, Package, Image as ImageIcon } from 'lucide-react';

const ProductModal = ({ onClose, product }: any) => {
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
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full max-w-lg bg-gray-950 border-l border-gray-800 z-[110] shadow-2xl flex flex-col"
      >
        <div className="p-8 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-white">
              {product ? 'Editar Produto' : 'Cadastrar Produto'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full text-gray-400">
              <X size={24} />
            </button>
          </div>

          <form className="space-y-6">
            {/* Upload de Imagem */}
            <div className="w-full h-48 bg-gray-900 border-2 border-dashed border-gray-800 rounded-2xl flex flex-col items-center justify-center gap-3 group cursor-pointer hover:border-blue-500/50 transition-all">
              <ImageIcon className="text-gray-600 group-hover:text-blue-500" size={32} />
              <p className="text-sm text-gray-500">Clique para enviar imagem do produto</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase" >Nome do Produto</label>
              <input className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 outline-none focus:border-blue-500 text-white" placeholder="Ex: Macbook Pro M3" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Preço de Venda</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R$</span>
                  <input className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 pl-10 outline-none focus:border-blue-500 text-white" placeholder="0,00" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Estoque Inicial</label>
                <input type="text" className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 outline-none focus:border-blue-500 text-white" placeholder="0" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Categoria</label>
              <select className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 outline-none focus:border-blue-500 text-white appearance-none">
                <option>Eletrônicos</option>
                <option>Acessórios</option>
                <option>Softwares</option>
              </select>
            </div>
          </form>
        </div>

        <div className="p-8 border-t border-gray-800 bg-gray-900/20">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2">
            <Save size={20} />
            Salvar Produto
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default ProductModal;