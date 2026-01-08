interface KpiCardProps {
  title: string;
  value: number;
  change: string;
  isPositive: boolean;
  icon: string;
  cash?: boolean
}

const KpiCard = ({ title, value, change, isPositive, icon, cash }: KpiCardProps) => (
  <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-1">{cash ? "R$ " + value : value}</h3>
      </div>
      <div className="p-2 bg-gray-800 rounded-lg text-xl text-gray-400">
        <span>{icon === 'trending_up' ? '📈' : icon === 'group' ? '👥' : icon === 'shopping_cart' ? '🛒' : '💰'}</span>
      </div>
    </div>
    <div className={`flex items-center text-xs font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
      <span className="mr-1">{isPositive ? '↑' : '↓'}</span>
      <span>{change + "%"}</span>
      <span className="text-gray-500 ml-2">vs. mês anterior</span>
    </div>
  </div>
);

export default KpiCard;