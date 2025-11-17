import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5001";

export default function Perfil() {
  const email = localStorage.getItem("usuarioEmail");
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const { data } = await axios.get(`${API_URL}/profissionais?email=${email}`);
        if (data.length) setPerfil(data[0]);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      }
    }
    carregar();
  }, [email]);

  if (!perfil) return <p className="text-center mt-16">Carregando...</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      {/* Header */}
      <div className="flex flex-wrap items-start gap-6">
        <img
          src={perfil.foto || "/user-placeholder.png"}
          alt="Foto de perfil"
          className="w-36 h-36 rounded-lg object-cover border shadow-md"
        />
        <div className="flex-1 min-w-[250px]">
          <h1 className="text-3xl font-bold">{perfil.nome}</h1>
          <p className="text-gray-700 text-lg">{perfil.cargo || "Cargo não informado"}</p>
          <p className="text-gray-500">{perfil.localizacao || "Localização não informada"}</p>
          <p className="text-sm text-gray-400 mt-1">
            Área: <span className="font-medium text-gray-700">{perfil.area || "—"}</span>
          </p>

          <Link
            to="/editar-perfil"
            className="inline-block mt-5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-5 py-2 rounded-lg shadow"
          >
            ✏️ Editar Perfil
          </Link>
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Resumo */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Sobre mim</h2>
        <p className="text-gray-700 leading-relaxed">
          {perfil.resumo || "Nenhuma descrição adicionada ainda."}
        </p>
      </section>

      {/* Habilidades */}
      <section className="grid sm:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="font-semibold text-lg mb-1">Habilidades Técnicas</h3>
          <div className="flex flex-wrap gap-2">
            {(perfil.habilidadesTecnicas || []).length
              ? perfil.habilidadesTecnicas.map((h, i) => (
                  <span key={i} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                    {h}
                  </span>
                ))
              : <p className="text-gray-500">—</p>}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-1">Soft Skills</h3>
          <div className="flex flex-wrap gap-2">
            {(perfil.softSkills || []).length
              ? perfil.softSkills.map((s, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                    {s}
                  </span>
                ))
              : <p className="text-gray-500">—</p>}
          </div>
        </div>
      </section>

      {/* Experiências */}
      <section className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Experiências</h3>
        {(perfil.experiencias || []).length ? (
          perfil.experiencias.map((exp, i) => (
            <div key={i} className="border p-4 rounded mb-3 shadow-sm bg-gray-50">
              <p className="font-semibold">{exp.cargo} — {exp.empresa}</p>
              <small className="text-gray-500">{exp.inicio} até {exp.fim || "Atual"}</small>
              <p className="text-gray-700 mt-1">{exp.descricao}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhuma experiência adicionada.</p>
        )}
      </section>

      {/* Formação */}
      <section className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Formação</h3>
        {(perfil.formacao || []).length ? (
          perfil.formacao.map((f, i) => (
            <div key={i} className="border-l-4 border-yellow-400 pl-3 mb-2">
              <p className="font-semibold">{f.curso}</p>
              <p className="text-gray-700 text-sm">{f.instituicao} — {f.ano}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhuma formação adicionada.</p>
        )}
      </section>

      {/* Projetos */}
      <section className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Projetos</h3>
        {(perfil.projetos || []).length ? (
          perfil.projetos.map((p, i) => (
            <div key={i} className="border p-4 rounded mb-3 bg-white shadow-sm">
              <p className="font-semibold">{p.titulo}</p>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  {p.link}
                </a>
              )}
              <p className="text-gray-700 mt-1">{p.descricao}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhum projeto adicionado.</p>
        )}
      </section>

      {/* Certificações */}
      <section className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Certificações</h3>
        {(perfil.certificacoes || []).length ? (
          <ul className="list-disc list-inside text-gray-700">
            {perfil.certificacoes.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhuma certificação adicionada.</p>
        )}
      </section>

      {/* Idiomas */}
      <section className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Idiomas</h3>
        {(perfil.idiomas || []).length ? (
          <ul className="list-disc list-inside text-gray-700">
            {perfil.idiomas.map((idioma, i) => (
              <li key={i}>{idioma.idioma} — {idioma.nivel}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhum idioma informado.</p>
        )}
      </section>

      {/* Áreas de Interesse */}
      <section className="mb-12">
        <h3 className="font-semibold text-lg mb-3">Áreas de Interesse</h3>
        {(perfil.areaInteresses || []).length ? (
          <div className="flex flex-wrap gap-2">
            {perfil.areaInteresses.map((a, i) => (
              <span key={i} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm">
                {a}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhuma área de interesse adicionada.</p>
        )}
      </section>
    </div>
  );
}