import formatPrice from "../../utils/formatPrice";

interface TableRowProps {
  id: string;
  client: string;
  date: string;
  status: 'completed' | 'pending' | 'canceled'; 
  value: number;
}

const subString = (string: string) => {
  return string.slice(0, 7)
}

const getDate = (date: string) => {
  const dataJs = new Date(date)
  return dataJs
}

const TableRow = ({ id, client, date, status, value }: TableRowProps) => {
  const statusColor = 
    status === 'completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
    status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
    'bg-red-500/10 text-red-400 border border-red-500/20';

  return (
    <tr className="hover:bg-gray-800/50 transition">
      <td className="px-6 py-4 font-medium text-white">#{subString(id)}...</td>
      <td className="px-6 py-4 flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-gray-700"></div>
        {client}
      </td>
      <td className="px-6 py-4">{getDate(date).toLocaleDateString()}</td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {status === 'canceled' ? 'Cancelado' : (status === 'completed' ? 'Completo' : "Pendente") }
        </span>
      </td>
      <td className="px-6 py-4 text-right font-medium text-white">{formatPrice(value)}</td>
    </tr>
  );
};

export default TableRow