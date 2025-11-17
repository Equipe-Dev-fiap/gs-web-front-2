import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  function validarEmail(email) {
    // Remove acentos e padroniza
    email = email.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // Regex de email válido
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? email : null;
  }

  async function registrar(e) {
    e.preventDefault();
    setErro("");

    const emailValido = validarEmail(email);
    if (!emailValido) {
      return setErro("❌ Digite um email válido (sem acentos)");
    }

    if (senha.length < 6) {
      return setErro("❌ A senha deve ter no mínimo 6 caracteres");
    }

    if (senha !== senha2) {
      return setErro("❌ As senhas não coincidem");
    }

    try {
      await axios.post(`${API_URL}/register`, {
        nome,
        email: emailValido,
        senha
      });

      alert("✅ Conta criada com sucesso!");
      window.location.href = "/login";

    } catch (err) {
      setErro("❌ Este email já está cadastrado.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl max-w-md w-full shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Criar <span className="text-yellow-400">Conta</span>
        </h2>

        {erro && <p className="bg-red-100 border border-red-300 text-red-700 p-2 rounded mb-4">{erro}</p>}

        <form onSubmit={registrar} className="space-y-4">

          <input
            type="text"
            placeholder="Nome completo"
            className="border p-3 rounded w-full"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email (sem acentos)"
            className="border p-3 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Senha (mín. 6 caracteres)"
              className="border p-3 rounded w-full pr-12"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <span
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {mostrarSenha ? "👁" : "👁‍🗨"}
            </span>
          </div>

          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Confirmar senha"
            className="border p-3 rounded w-full"
            value={senha2}
            onChange={(e) => setSenha2(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 rounded font-semibold transition"
          >
            Criar Conta
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Já tem conta? <a href="/login" className="text-yellow-500 hover:underline">Entrar</a>
        </p>

      </div>
    </div>
  );
}