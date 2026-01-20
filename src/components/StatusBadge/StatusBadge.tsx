const StatusBadge = ({ status }: { status: SalesData["status"]}) => {
  const styles = {
    completed: "bg-green-500/10 text-green-400 border-green-500/20",
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    canceled: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold uppercase tracking-wider ${styles[status]}`}
    >
      {status === "canceled"
        ? "Cancelado"
        : status === "completed"
        ? "Completo"
        : "Pendente"}
    </span>
  );
};
export default StatusBadge;