export default function CardProfissional({ item, onOpen }) {
  const habilidades = item.habilidadesTecnicas || [];
  const mostrar = habilidades.slice(0, 3);
  const extras = habilidades.length - 3;

  return (
    <div
      onClick={() => onOpen(item)}
      className="cursor-pointer bg-white border rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 p-5 flex flex-col justify-between group"
    >
      {/* FOTO + NOME */}
      <div className="flex items-center gap-4">
        {item.foto ? (
          <img
            src={item.foto}
            alt={item.nome}
            className="w-16 h-16 rounded-lg object-cover border border-gray-200 shadow-sm"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Sem foto
          </div>
        )}

        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 truncate">
            {item.nome || "Sem nome"}
          </h3>
          <p className="text-sm text-gray-600 truncate">
            {item.cargo || "Cargo não informado"}
          </p>
          <p className="text-xs text-gray-400">
            {item.area || "Área não informada"}
          </p>
        </div>
      </div>

      {/* RESUMO */}
      {item.resumo && (
        <p className="text-sm text-gray-600 mt-3 line-clamp-3">
          {item.resumo}
        </p>
      )}

      {/* HABILIDADES */}
      {habilidades.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {mostrar.map((h, i) => (
            <span
              key={i}
              className="text-xs bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded-full font-medium"
            >
              {h}
            </span>
          ))}

          {/* “+N mais” */}
          {extras > 0 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
              +{extras} mais
            </span>
          )}
        </div>
      )}

      {/* BOTÃO VISUALIZAÇÃO (aparece ao passar o mouse) */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
        <p className="text-center text-sm text-yellow-600 font-medium">
          Clique para ver perfil completo →
        </p>
      </div>
    </div>
  );
}