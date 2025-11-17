import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001";

export default function Chat() {
  const { email } = useParams(); // email da pessoa com quem estou conversando
  const meuEmail = localStorage.getItem("usuarioEmail");
  const meuNome = localStorage.getItem("usuarioNome");

  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");

  async function carregarMensagens() {
    if (!meuEmail || !email) return;

    try {
      const resp = await axios.get(`${API_URL}/mensagens/conversa`, {
        params: {
          user1: meuEmail,
          user2: email,
        },
      });
      setMensagens(resp.data);
    } catch (err) {
      console.error("Erro ao carregar mensagens:", err);
    }
  }

  async function enviarMensagem() {
    if (!texto.trim()) return;
    if (!meuEmail || !email) {
      alert("Erro: usuário não identificado.");
      return;
    }

    try {
      await axios.post(`${API_URL}/mensagens`, {
        remetente: meuEmail,
        destinatario: email,
        texto,
        remetenteNome: meuNome,
      });

      setTexto("");
      await carregarMensagens();
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      alert("Erro ao enviar mensagem.");
    }
  }

  useEffect(() => {
    carregarMensagens();
    // opcional: recarregar a cada X segundos
    // const id = setInterval(carregarMensagens, 5000);
    // return () => clearInterval(id);
  }, [email, meuEmail]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">
        Conversa com <span className="text-yellow-500">{email}</span>
      </h1>

      {/* mensagens */}
      <div className="flex-1 bg-white p-4 rounded-xl shadow overflow-y-auto mb-4">
        {mensagens.length === 0 && (
          <p className="text-sm text-gray-500 text-center">
            Nenhuma mensagem ainda. Comece a conversa!
          </p>
        )}

        {mensagens.map((m) => (
          <div
            key={m.id}
            className={`p-3 my-2 rounded-xl max-w-xs ${
              m.remetente === meuEmail
                ? "bg-yellow-300 ml-auto text-right"
                : "bg-gray-200"
            }`}
          >
            <p className="text-sm">{m.texto}</p>
            <p className="text-[10px] text-gray-600 mt-1">
              {new Date(m.data || m.dataEnvio || "").toLocaleString("pt-BR")}
            </p>
          </div>
        ))}
      </div>

      {/* enviar */}
      <div className="flex gap-2">
        <input
          className="flex-1 border p-3 rounded-lg"
          placeholder="Digite sua mensagem..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button
          onClick={enviarMensagem}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}