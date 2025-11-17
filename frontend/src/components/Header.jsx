import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const logado = localStorage.getItem("usuarioEmail");

  function logout() {
    localStorage.removeItem("usuarioEmail");
    navigate("/login");
  }

  return (
    <header className="w-full bg-white shadow-sm border-b py-3 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-yellow-500 cursor-pointer" onClick={() => navigate("/")}>
        ConectaPro
      </h1>

      <nav className="flex gap-6 text-gray-700 font-medium">
        {!logado && (
          <>
            <Link to="/">Home</Link>
            <Link to="/sobre">Sobre</Link>
            <Link to="/contato">Contato</Link>
            <Link to="/login">Login</Link>
          </>
        )}

        {logado && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/perfil">Meu Perfil</Link>
            <button onClick={logout} className="text-red-500 hover:underline">
              Sair
            </button>
          </>
        )}
      </nav>
    </header>
  );
}