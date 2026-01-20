interface SaleModalProps {
  sale: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSale: any) => void;
}

const SaleModal = ({ sale, isOpen, onClose }: SaleModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-950 border border-gray-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-900 flex justify-between items-center bg-gray-900/20">
          <div>
            <h2 className="text-xl font-bold text-white">
              Detalhes da Venda
            </h2>
            <p className="text-sm text-gray-500">ID: {sale._id}...</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-2xl">&times;</button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Cliente (Sempre fixo ou editável) */}
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Cliente</label>
              <div className="p-3 bg-gray-900/50 rounded-xl border border-gray-800 text-gray-300">
                {sale.clientData?.name || "Cliente não informado"}
              </div>
            </div>

            {/* Produto */}
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Produto</label>
              <div className="p-3 bg-gray-900/50 rounded-xl border border-gray-800 text-gray-300">
                {sale.productData?.name}
              </div>
            </div>

            {/* Valor */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Valor Total</label>
              <input 
                disabled={true}
                value={sale.totalPrice}
                className={"p-3 bg-gray-900/50 rounded-xl border border-gray-800 text-gray-300"}
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</label>
              <input 
                  disabled={true}
                  value={sale.status}
                  className={"p-3 bg-gray-900/50 rounded-xl border border-gray-800 text-gray-300"}
                />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-900 bg-gray-900/20 flex gap-3">
            <button onClick={onClose} className="flex-1 bg-gray-900 text-gray-400 py-3 rounded-xl hover:bg-gray-800 transition-all">
              Fechar
            </button>
        </div>
      </div>
    </div>
  );
};

export default SaleModal