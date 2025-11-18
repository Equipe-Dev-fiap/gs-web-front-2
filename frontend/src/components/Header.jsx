import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// Você pode adicionar ícones se quiser, por exemplo usando lucide-react:
// import { Sun, Moon } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const logado = localStorage.getItem("usuarioEmail");
  
  // 1. Gerenciar o estado do tema no React
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Função de logout existente
  function logout() {
    localStorage.removeItem("usuarioEmail");
    navigate("/login");
  }

  // 2. Função para alternar o tema
  function toggleDarkMode() {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    // Salva a preferência no localStorage
    localStorage.setItem("theme", newMode ? "dark" : "light");
  }

  // 3. Efeito colateral para aplicar a classe 'dark' ao <html>
  useEffect(() => {
    const htmlEl = document.documentElement;
    if (isDarkMode) {
      htmlEl.classList.add("dark");
    } else {
      htmlEl.classList.remove("dark");
    }
  }, [isDarkMode]); // Roda sempre que isDarkMode muda

  // 4. Efeito para carregar o tema inicial ao montar o componente
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Define o estado inicial com base no storage ou preferência do sistema
    if (savedTheme === "dark" || (savedTheme === null && prefersDark)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []); // Roda apenas na montagem inicial

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-sm border-b py-3 px-6 flex justify-between items-center transition-colors">
      <h1
        className="text-xl font-bold text-yellow-500 cursor-pointer"
        onClick={() => navigate("/")}
      >
        ConectaPro
      </h1>

      <nav className="flex gap-6 text-gray-700 dark:text-gray-300 font-medium items-center">
        {!logado && (
          <>
            <Link to="/" className="dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
            <Link to="/sobre" className="dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Sobre</Link>
            <Link to="/contato" className="dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contato</Link>
            <Link to="/login" className="dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Login</Link>
          </>
        )}

        {logado && (
          <>
            <Link to="/dashboard" className="dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link>
            <Link to="/mensagens" className="dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Mensagens</Link>
            <Link to="/perfil" className="dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Meu Perfil</Link>
            <button
              onClick={logout}
              className="text-red-500 hover:underline"
            >
              Sair
            </button>
          </>
        )}

        {/* 5. O Botão de Alternância de Tema */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors ml-4"
          aria-label="Alternar modo claro/escuro"
          title={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
        >
          {/* Exibe Sol se for Dark Mode, Lua se for Light Mode (para indicar a mudança) */}
          {isDarkMode ? "☀️" : "🌙"} 
        </button>
      </nav>
    </header>
  );
}