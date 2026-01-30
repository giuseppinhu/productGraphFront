import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const ActionMenu = ({
  id,
  onClickView,
  onClickEdit,
  onClickDelete,
}: {
  id: string;
  url: string;
  onClickView: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex justify-center" ref={menuRef}>
      {/* Botão de Gatilho (Os 3 pontos) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors ${
          isOpen
            ? "bg-gray-800 text-white"
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`}
      >
        <span className="text-lg">•••</span>
      </button>

      {/* Menu Suspenso */}
      {isOpen && (
        <div className="absolute right-0 mt-10 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50 py-2 animate-in fade-in zoom-in duration-200">
          <p className="px-4 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Ações
          </p>

          <button
            onClick={() => {
              setIsOpen(false);
              onClickView();
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-3"
          >
            <span>👁️</span> Visualizar
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              onClickEdit();
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 transition-colors flex items-center gap-3"
          >
            <span>✏️</span> Editar
          </button>

          <div className="border-t border-gray-800 my-1"></div>

          <button
            onClick={() => {
              onClickDelete()
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-950/30 transition-colors flex items-center gap-3"
          >
            <span>🗑️</span> Excluir{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
