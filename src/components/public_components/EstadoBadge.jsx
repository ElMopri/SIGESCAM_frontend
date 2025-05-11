const EstadoBadge = ({ estado }) => {
  const color = estado === "Habilitado" ? "green" : "red";
  return (
    <span className={`text-${color}-700 bg-${color}-100 px-2 py-1 rounded-full text-sm`}>
      {estado}
    </span>
  );
};

export default EstadoBadge;
