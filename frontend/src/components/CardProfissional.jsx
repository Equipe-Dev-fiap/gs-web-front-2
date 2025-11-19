import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5001";

export default function CardProfissional({ item, onOpen }) {
  const habilidades = item.habilidadesTecnicas || [];
  const mostrar = habilidades.slice(0, 3);
  const extras = habilidades.length - 3;

  const emailLogado = localStorage.getItem("usuarioEmail");
  const nomeLogado = localStorage.getItem("usuarioNome");
  const isMeuPerfil =
    emailLogado &&
    item.email &&
    item.email.toLowerCase() === emailLogado.toLowerCase();

  const [recomendadoPor, setRecomendadoPor] = useState(
    item.recomendadoPor || []
  );

  const navigate = useNavigate();

  async function handleRecomendar(e) {
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
    e.stopPropagation();

    if (!emailLogado) {
      alert("Você precisa estar logado para enviar mensagens.");
      return;
    }

    if (!item.email) {
      alert("Esse perfil não possui email cadastrado.");
      return;
    }

    navigate(`/chat/${encodeURIComponent(item.email)}`);
  }

  return (
    <div
      onClick={() => onOpen(item)}
      className="
        cursor-pointer 
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
        rounded-2xl shadow-md 
        hover:shadow-xl hover:-translate-y-1 
        transition-all duration-200 
        p-5 
        flex flex-col justify-between group
        text-gray-900 dark:text-gray-100
      "
    >
      {/* FOTO + NOME */}
      <div className="flex items-center gap-4">
        {item.foto ? (
          <img
            src={item.foto ? `${API_URL}/${item.foto}` : "/user-placeholder.png"}
            alt={item.nome}
            className="
              w-16 h-16 rounded-lg object-cover 
              border border-gray-200 dark:border-gray-600 
              shadow-sm
            "
          />
        ) : (
          <div
            className="
              w-16 h-16 
              bg-gray-100 dark:bg-gray-700
              border border-gray-200 dark:border-gray-600
              rounded-lg 
              flex items-center justify-center 
              text-gray-400 dark:text-gray-300 text-sm
            "
          >
            Sem foto
          </div>
        )}

        <div className="flex-1">
          <h3 className="font-semibold text-lg truncate">
            {item.nome || "Sem nome"}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {item.cargo || "Cargo não informado"}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-400">
            {item.area || "Área não informada"}
          </p>
        </div>
      </div>

      {/* RESUMO */}
      {item.resumo && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-3">
          {item.resumo}
        </p>
      )}

      {/* HABILIDADES */}
      {habilidades.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {mostrar.map((h, i) => (
            <span
              key={i}
              className="
                text-xs 
                bg-yellow-100 dark:bg-yellow-600 
                text-yellow-800 dark:text-yellow-100
                px-2.5 py-1 rounded-full font-medium
              "
            >
              {h}
            </span>
          ))}

          {extras > 0 && (
            <span
              className="
                text-xs 
                bg-gray-100 dark:bg-gray-700 
                text-gray-600 dark:text-gray-300 
                px-2.5 py-1 rounded-full font-medium
              "
            >
              +{extras} mais
            </span>
          )}
        </div>
      )}

      {/* RECOMENDADO POR */}
      {Array.isArray(recomendadoPor) && recomendadoPor.length > 0 && (
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Recomendado por: {recomendadoPor.map((r) => r.nome || r.email).join(", ")}
        </p>
      )}

      {/* BOTÕES */}
      {!isMeuPerfil && emailLogado && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleRecomendar}
            className="
              text-xs 
              bg-yellow-400 hover:bg-yellow-500 
              text-gray-900 
              px-3 py-1 rounded-full 
              font-semibold shadow-sm
            "
          >
            Recomendar perfil
          </button>

          <button
            onClick={handleIrParaChat}
            className="
              text-xs 
              bg-gray-200 dark:bg-gray-700 
              hover:bg-gray-300 dark:hover:bg-gray-600
              text-gray-800 dark:text-gray-200
              px-3 py-1 rounded-full font-semibold
            "
          >
            Enviar mensagem
          </button>
        </div>
      )}

      {/* TEXTO DO HOVER */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
        <p className="text-center text-sm text-yellow-600 dark:text-yellow-400 font-medium">
          Clique para ver perfil completo →
        </p>
      </div>
    </div>
  );
}