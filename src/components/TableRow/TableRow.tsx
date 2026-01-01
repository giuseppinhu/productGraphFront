interface TableRowProps {
  id: string;
  client: string;
  date: string;
  status: 'Concluído' | 'Pendente' | 'Cancelado'; 
  value: string;
}


const TableRow = ({ id, client, date, status, value }: TableRowProps) => {
  const statusColor = 
    status === 'Concluído' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
    status === 'Pendente' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
    'bg-red-500/10 text-red-400 border border-red-500/20';

  return (
    <tr className="hover:bg-gray-800/50 transition">
      <td className="px-6 py-4 font-medium text-white">{id}</td>
      <td className="px-6 py-4 flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-gray-700"></div>
        {client}
      </td>
      <td className="px-6 py-4">{date}</td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-right font-medium text-white">{value}</td>
    </tr>
  );
};

export default TableRow