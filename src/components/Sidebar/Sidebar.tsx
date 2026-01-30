import { DoorOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("");

  const loc = useLocation();

  useEffect(() => {
    const currentPath = loc.pathname;
    const currentItem = menuItems.find((item) => item.path === currentPath);
    if (currentItem) {
      setActiveTab(currentItem.label);
    }
  }, [loc.pathname]);

  const menuItems: NavItem[] = [
    { label: "Dashboard", icon: "📊", path: "/dashboard" },
    { label: "Vendas", icon: "💰", path: "/sales" },
    { label: "Produtos", icon: "📦", path: "/products" },
    { label: "Usuários", icon: "👥", path: "/users" },
    { label: "Configurações", icon: "⚙️", path: "/config" },
  ];

  return (
    <aside className="min-h-screen bg-gray-950 border-r border-gray-900 flex flex-col left-0 top-0">
      {/* Logo / Branding */}
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
            D
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            DashSale
          </span>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-4 space-y-1 w-65">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            onClick={() => setActiveTab(item.label)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.label
                ? "bg-blue-600/10 text-blue-500"
                : "text-gray-400 hover:bg-gray-900 hover:text-gray-200"
            }`}
          >
            <span
              className={`text-xl transition-transform duration-200 group-hover:scale-110 ${
                activeTab === item.label ? "opacity-100" : "opacity-70"
              }`}
            >
              {item.icon}
            </span>
            <span className="font-medium text-sm">{item.label}</span>

            {/* Indicador Ativo */}
            {activeTab === item.label && (
              <div className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            )}
          </NavLink>
        ))}
      </nav>

      {/* Perfil / Footer */}
      <div className="p-4 border-t border-gray-900">
        <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-900 transition-colors">
          <img
            src="https://res.cloudinary.com/dhn5ceymi/image/upload/v1768948550/avatars/avatar_admin.png"
            alt="User_Image"
            className="w-10 h-10 rounded-full border border-gray-800"
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-white">Seu Nome</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <span className="ml-auto text-gray-600 text-xs cursor-pointer" onClick={() => console.log("adads")}>
            <DoorOpen className="text-red-400 hover:text-red-800"/>
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
