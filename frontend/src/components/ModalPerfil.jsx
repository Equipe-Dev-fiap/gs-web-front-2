export default function ModalPerfil({ item, onClose }) {
  if (!item) return null;

  const emailLogado = localStorage.getItem("usuarioEmail");
  const isMeuPerfil = emailLogado && item.email === emailLogado;
  const API_URL = "http://localhost:5001";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="
        bg-white dark:bg-gray-900 
        w-full max-w-3xl rounded-2xl p-6 
        shadow-xl overflow-y-auto max-h-[90vh]
        text-gray-900 dark:text-gray-100
      ">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {item.nome || "Sem nome"}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {item.cargo || "Cargo não informado"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {item.localizacao || "Localização não informada"} •{" "}
              {item.area || "Área não informada"}
            </p>

            {/* RECOMENDADO POR */}
            {Array.isArray(item.recomendadoPor) &&
              item.recomendadoPor.length > 0 && (
                <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                  Recomendado por:{" "}
                  {item.recomendadoPor
                    .map((r) => r.nome || r.email)
                    .join(", ")}
                </p>
              )}
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 font-medium"
          >
            ✕ Fechar
          </button>
        </div>

        {/* FOTO + RESUMO */}
        <div className="grid md:grid-cols-3 gap-6">
          <img
            src={item.foto ? `${API_URL}/${item.foto}` : "https://via.placeholder.com/180"}
            alt="Foto"
            className="
              w-full rounded-xl object-cover 
              border shadow-sm 
              border-gray-300 dark:border-gray-700
            "
          />

          <div className="md:col-span-2">
            <h4 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">Sobre</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {item.resumo || "Nenhuma descrição adicionada."}
            </p>
          </div>
        </div>

        {/* HABILIDADES */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">

          <div>
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Habilidades Técnicas
            </h4>

            <div className="flex flex-wrap gap-2">
              {(item.habilidadesTecnicas || []).length > 0 ? (
                item.habilidadesTecnicas.map((s, i) => (
                  <span
                    key={i}
                    className="
                      text-xs 
                      bg-yellow-100 dark:bg-yellow-600 
                      text-yellow-800 dark:text-yellow-100 
                      px-2 py-1 rounded
                    "
                  >
                    {s}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Nenhuma habilidade técnica.
                </p>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Soft Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {(item.softSkills || []).length > 0 ? (
                item.softSkills.map((s, i) => (
                  <span
                    key={i}
                    className="
                      text-xs 
                      bg-gray-100 dark:bg-gray-700 
                      text-gray-700 dark:text-gray-300 
                      px-2 py-1 rounded
                    "
                  >
                    {s}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Nenhuma soft skill.
                </p>
              )}
            </div>
          </div>

        </div>

        {/* EXPERIÊNCIAS */}
        {item.experiencias?.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Experiências</h4>
            <ul className="space-y-2 text-sm">
              {item.experiencias.map((e, i) => (
                <li
                  key={i}
                  className="
                    border p-3 rounded-lg 
                    bg-gray-50 dark:bg-gray-800 
                    border-gray-200 dark:border-gray-700
                  "
                >
                  <b>{e.cargo}</b> · {e.empresa}
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {e.inicio} — {e.fim || "Atual"}
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 mt-1">
                    {e.descricao}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FORMAÇÃO */}
        {item.formacao?.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Formação</h4>
            {item.formacao.map((f, i) => (
              <div
                key={i}
                className="
                  border-l-4 border-yellow-400 pl-3 mb-2 
                  dark:border-yellow-500
                "
              >
                <p className="font-semibold">{f.curso}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {f.instituicao} — {f.ano}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* PROJETOS */}
        {item.projetos?.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Projetos</h4>
            {item.projetos.map((p, i) => (
              <div
                key={i}
                className="
                  border p-3 rounded mb-2 
                  bg-white dark:bg-gray-800 
                  shadow-sm 
                  border-gray-200 dark:border-gray-700
                "
              >
                <p className="font-semibold">{p.titulo}</p>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline text-xs"
                  >
                    {p.link}
                  </a>
                )}
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                  {p.descricao}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CERTIFICAÇÕES */}
        {item.certificacoes?.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Certificações</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
              {item.certificacoes.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        {/* IDIOMAS */}
        {item.idiomas?.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Idiomas</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
              {item.idiomas.map((idioma, i) => (
                <li key={i}>
                  {idioma.idioma} — {idioma.nivel}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ÁREAS DE INTERESSE */}
        {item.areaInteresses?.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Áreas de Interesse
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.areaInteresses.map((a, i) => (
                <span
                  key={i}
                  className="
                    bg-yellow-100 dark:bg-yellow-600 
                    text-yellow-800 dark:text-yellow-100 
                    px-3 py-1 rounded text-xs
                  "
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* BOTÕES */}
        <div className="mt-8 flex justify-end gap-3">
          {isMeuPerfil && (
            <a
              href="/perfil"
              className="
                bg-yellow-400 hover:bg-yellow-500 
                text-gray-900 px-4 py-2 rounded 
                font-semibold shadow-sm transition
              "
            >
              Editar meu perfil
            </a>
          )}
          <button
            onClick={onClose}
            className="
              border px-4 py-2 rounded 
              hover:bg-gray-100 dark:hover:bg-gray-800 
              border-gray-300 dark:border-gray-600 
              text-gray-800 dark:text-gray-200 
              transition
            "
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}