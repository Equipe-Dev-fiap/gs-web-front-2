import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5001";

export default function CardProfissional({ item, onOpen }) {
  const habilidades = item.habilidadesTecnicas || [];
  const mostrar = habilidades.slice(0, 3);
  const extras = habilidades.length - 3;

  // dados do usuário logado
  const emailLogado = localStorage.getItem("usuarioEmail");
  const nomeLogado = localStorage.getItem("usuarioNome");
  const isMeuPerfil =
    emailLogado &&
    item.email &&
    item.email.toLowerCase() === emailLogado.toLowerCase();

  // estado local para refletir as recomendações
  const [recomendadoPor, setRecomendadoPor] = useState(
    item.recomendadoPor || []
  );

  const navigate = useNavigate();

  async function handleRecomendar(e) {
    // não deixar o clique do botão abrir o modal
    e.stopPropagation();

    if (!emailLogado) {
      alert("Você precisa estar logado para recomendar um perfil.");
      return;
    }

    try {
      const resp = await axios.post(
        `${API_URL}/profissionais/${item.id}/recomendar`,
        {
          recomendadorEmail: emailLogado,
          recomendadorNome: nomeLogado,
        }
      );

      setRecomendadoPor(resp.data.recomendadoPor || []);
      alert("Perfil recomendado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao recomendar perfil.");
    }
  }

  function handleIrParaChat(e) {
    // não deixar abrir o modal
    e.stopPropagation();

    if (!emailLogado) {
      alert("Você precisa estar logado para enviar mensagens.");
      return;
    }

    if (!item.email) {
      alert("Esse perfil não possui email cadastrado.");
      return;
    }

    // vai para /chat/:emailDoPerfil
    navigate(`/chat/${encodeURIComponent(item.email)}`);
  }

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

      {/* RECOMENDADO POR */}
      {Array.isArray(recomendadoPor) && recomendadoPor.length > 0 && (
        <p className="mt-3 text-xs text-gray-500">
          Recomendado por:{" "}
          {recomendadoPor.map((r) => r.nome || r.email).join(", ")}
        </p>
      )}

      {/* BOTÕES: Recomendar + Enviar mensagem (não no próprio perfil) */}
      {!isMeuPerfil && emailLogado && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleRecomendar}
            className="text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 rounded-full font-semibold shadow-sm"
          >
            Recomendar perfil
          </button>

          <button
            onClick={handleIrParaChat}
            className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-full font-semibold"
          >
            Enviar mensagem
          </button>
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