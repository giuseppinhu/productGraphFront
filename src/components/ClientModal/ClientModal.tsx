import React, { useState, useEffect } from 'react';
import { X, Save, User, Mail, Phone, MapPin, Hash } from 'lucide-react';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client?: any; // Se vier vazio, é "Novo Cliente"
}

const ClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, client }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    document: '',
    address: ''
  });

  // Atualiza o form quando o modal abre ou o cliente muda
  useEffect(() => {
    if (client) {
      setFormData(client);
    } else {
      setFormData({ name: '', email: '', phone: '', document: '', address: '' });
    }
  }, [client, isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />

      {/* Slide-over Panel */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-gray-950 border-l border-gray-800 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/20">
            <div>
              <h2 className="text-xl font-bold text-white">{client ? 'Editar Cliente' : 'Novo Cliente'}</h2>
              <p className="text-sm text-gray-500">Preencha as informações principais</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Nome Completo */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-gray-200 outline-none focus:border-blue-500/50 transition-all"
                  placeholder="Ex: Giuseppe Silva"
                />
              </div>
            </div>

            {/* Email e Telefone */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-gray-200 outline-none focus:border-blue-500/50 transition-all"
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Telefone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input 
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-gray-200 outline-none focus:border-blue-500/50 transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </div>

            {/* Documento (CPF/CNPJ) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">CPF ou CNPJ</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input 
                  type="text"
                  value={formData.document}
                  onChange={(e) => setFormData({...formData, document: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-gray-200 outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>

            {/* Endereço */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Endereço Completo</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-600" />
                <textarea 
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-gray-200 outline-none focus:border-blue-500/50 transition-all resize-none"
                  placeholder="Rua, Número, Bairro, Cidade..."
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-800 bg-gray-900/20 space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              {client ? 'Salvar Alterações' : 'Cadastrar Cliente'}
            </button>
            <button onClick={onClose} className="w-full text-gray-500 hover:text-white py-2 transition-colors text-sm">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientModal;