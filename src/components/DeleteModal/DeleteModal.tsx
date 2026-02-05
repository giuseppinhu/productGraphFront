import { AlertTriangle, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  loading?: boolean;
  url: string;
}

const DeleteModal = ({ isOpen, onClose, itemId, url }: DeleteModalProps) => {
  const [loading, setloading] = useState(false);

  if (!isOpen) return null;

  const deleteAction = (id: any, url: string) => {
    setloading(true);

    const intervalId = setInterval(() => {
      axios
        .delete(url + id)
        .then(() => {
          toast.success("Deletado com sucesso!");
          onClose();
          setloading(false);
          clearInterval(intervalId);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocorreu um erro!" + "\n" + error.response.data.error);
          onClose();
          clearInterval(intervalId);
        });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-gray-950 border border-gray-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
        {/* Header com ícone de alerta */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Confirmar Exclusão</h2>
          <p className="text-gray-400 mt-2">
            Tem certeza que deseja excluir <strong>{itemId}</strong>? Esta ação
            não pode ser desfeita.
          </p>
        </div>

        {/* Footer com botões */}
        <div className="p-6 bg-gray-900/30 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl bg-gray-800 text-gray-300 font-semibold hover:bg-gray-700 transition-all disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={() => deleteAction(itemId, url)}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Sim, Excluir"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
