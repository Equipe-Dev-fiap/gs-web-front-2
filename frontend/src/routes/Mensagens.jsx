import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5001";

export default function Mensagens() {
  const navigate = useNavigate();
  const emailLogado = localStorage.getItem("usuarioEmail");

  const [contatos, setContatos] = useState([]);
  const [profissionais, setProfissionais] = useState([]);

  useEffect(() => {
    if (!emailLogado) return;

    async function carregar() {
      try {
        const [inboxResp, profResp] = await Promise.all([
          axios.get(`${API_URL}/mensagens/inbox/${emailLogado}`),
          axios.get(`${API_URL}/profissionais`),
        ]);

        setContatos(inboxResp.data);
        setProfissionais(profResp.data);
      } catch (err) {
        console.error("Erro ao carregar inbox:", err);
      }
    }

    carregar();
  }, [emailLogado]);

  function nomeDoContato(emailContato) {
    const p = profissionais.find(
      (prof) =>
        prof.email &&
        prof.email.toLowerCase() === String(emailContato).toLowerCase()
    );
    return p?.nome || emailContato;
  }

  if (!emailLogado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">
          Faça login para ver suas mensagens.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      {/* LISTA DE CONVERSAS */}
      <div className="
        w-80 border-r border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800 
        p-4 shadow-md flex flex-col
      ">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Conversas 💬
        </h2>

        {/* CAIXA DE BUSCA */}
        <input
          type="text"
          placeholder="Buscar conversa..."
          className="
            w-full mb-4 px-3 py-2 rounded-lg border 
            text-sm 
            border-gray-300 dark:border-gray-600 
            bg-white dark:bg-gray-700 
            text-gray-900 dark:text-gray-100 
            placeholder-gray-400 dark:placeholder-gray-300 
            focus:ring-2 focus:ring-yellow-400 outline-none
          "
        />

        {contatos.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Você ainda não iniciou nenhuma conversa.
          </p>
        )}

        {/* LISTA */}
        <ul className="space-y-2 overflow-y-auto">
          {contatos.map((emailContato) => (
            <li key={emailContato}>
              <button
                onClick={() =>
                  navigate(`/chat/${encodeURIComponent(emailContato)}`)
                }
                className="
                  w-full text-left px-3 py-3 rounded-xl 
                  hover:bg-gray-100 dark:hover:bg-gray-700 
                  transition flex items-center gap-3
                "
              >
                {/* FOTO REDONDA */}
                <div className="
                  w-10 h-10 rounded-full bg-yellow-200 dark:bg-yellow-500 
                  flex items-center justify-center 
                  text-yellow-700 dark:text-yellow-900 font-semibold
                ">
                  {nomeDoContato(emailContato).charAt(0)}
                </div>

                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                    {nomeDoContato(emailContato)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {emailContato}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ÁREA VAZIA */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center px-4 leading-relaxed">
          Selecione um contato à esquerda
          <br />
          ou envie uma mensagem pelo dashboard.
        </p>
      </div>
    </div>
  );
}