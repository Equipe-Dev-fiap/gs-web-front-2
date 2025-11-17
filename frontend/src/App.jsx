import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./routes/Home";
import Sobre from "./routes/Sobre";
import Contato from "./routes/Contato";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import Perfil from "./routes/Perfil";
import EditarPerfil from "./routes/EditarPerfil";
import Mensagens from "./routes/Mensagens";
import Chat from "./routes/Chat";
import Error from "./routes/Error";

// ROTA PRIVADA: só deixa entrar se estiver logado
function PrivateRoute({ children }) {
  const logado = localStorage.getItem("usuarioEmail");
  return logado ? children : <Navigate to="/login" replace />;
}

// ROTA PÚBLICA
function PublicRoute({ children }) {
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* PÚBLICAS */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/sobre"
          element={
            <PublicRoute>
              <Sobre />
            </PublicRoute>
          }
        />
        <Route
          path="/contato"
          element={
            <PublicRoute>
              <Contato />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* PRIVADAS */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/editar-perfil"
          element={
            <PrivateRoute>
              <EditarPerfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/mensagens"
          element={
            <PrivateRoute>
              <Mensagens />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/:email"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />

        {/* ERRO */}
        <Route path="*" element={<Error />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}