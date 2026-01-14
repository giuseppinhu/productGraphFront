interface MenuItemProps {
  icon: string;
  text: string;
  active?: boolean;
  color?: string;
}

const MenuItem = ({ icon, text, active, color }: MenuItemProps) => (
  <a
    href="#"
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mx-2 ${active ? "bg-blue-600 text-white" : "hover:bg-gray-800 text-gray-300"} ${color || ""}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{text}</span>
  </a>
);

export default MenuItem;
