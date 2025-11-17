import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5001";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const response = await axios.post(`${API_URL}/login`, { email, senha });

      const usuario = response.data.usuario;

      if (!usuario) {
        setMensagem("❌ Email ou senha incorretos.");
        return;
      }

      // Salvar sessão
      localStorage.setItem("usuarioNome", usuario.nome);
      localStorage.setItem("usuarioEmail", usuario.email);

      setMensagem("✅ Login realizado com sucesso!");

      setTimeout(() => navigate("/dashboard"), 800);
    } catch (error) {
      console.error(error);
      setMensagem("❌ Email ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-10 rounded-xl w-full max-w-md text-center shadow-sm border border-gray-200">

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Entrar no <span className="text-yellow-400">ConectaPro</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-6 text-left">

          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:border-yellow-400 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:border-yellow-400 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-lg py-3 rounded-lg font-semibold transition"
          >
            Entrar
          </button>
        </form>

        {mensagem && (
          <p
            className="mt-4 text-sm text-center p-3 rounded-lg border bg-gray-50 border-gray-300 text-gray-700"
          >
            {mensagem}
          </p>
        )}

        <p className="mt-6 text-sm text-gray-500">
          Não tem conta?{" "}
          <a href="/register" className="text-yellow-500 hover:text-yellow-600 font-semibold">
            Criar Conta
          </a>
        </p>

      </div>
    </div>
  );
}