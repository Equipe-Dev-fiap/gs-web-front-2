const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Caminhos dos JSONs
const usuariosPath = path.join(__dirname, "data/usuario.json");
const profissionaisPath = path.join(__dirname, "data/profissionais.json");

// Funções auxiliares
const lerProfissionais = () => JSON.parse(fs.readFileSync(profissionaisPath, "utf8"));
const salvarProfissionais = (dados) =>
  fs.writeFileSync(profissionaisPath, JSON.stringify(dados, null, 2));

// ============================== LOGIN ==============================
app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  const usuarios = JSON.parse(fs.readFileSync(usuariosPath, "utf8"));

  const usuarioEncontrado = usuarios.find(
    (u) => u.email === email && u.senha === senha
  );

  if (!usuarioEncontrado) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  res.json({ message: "ok", usuario: { nome: usuarioEncontrado.nome, email } });
});

// ============================== REGISTER ==============================
app.post("/register", (req, res) => {
  const { nome, email, senha } = req.body;
  const usuarios = JSON.parse(fs.readFileSync(usuariosPath, "utf8"));

  const existe = usuarios.find((u) => u.email === email);
  if (existe) {
    return res.status(400).json({ message: "Email já cadastrado" });
  }

  usuarios.push({ nome, email, senha });
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
  res.status(201).json({ message: "Usuário registrado com sucesso!" });
});

// ============================== LISTAR PROFISSIONAIS ==============================
app.get("/profissionais", (req, res) => {
  const lista = lerProfissionais();
  const { email } = req.query;

  if (email) {
    return res.json(lista.filter((p) => (p.email || "").toLowerCase() === email.toLowerCase()));
  }

  res.json(lista);
});

// ============================== CRIAR PERFIL ==============================
app.post("/profissionais", (req, res) => {
  const lista = lerProfissionais();
  const novo = req.body;
  novo.id = lista.length ? lista[lista.length - 1].id + 1 : 1;

  lista.push(novo);
  salvarProfissionais(lista);

  res.status(201).json({ message: "Perfil criado com sucesso!", id: novo.id });
});

// ============================== ATUALIZAR PERFIL ==============================
app.put("/profissionais/:id", (req, res) => {
  const id = Number(req.params.id);
  const lista = lerProfissionais();
  const indice = lista.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({ message: "Perfil não encontrado" });
  }

  // ✅ mantém ID e email originais e mescla com o novo corpo
  lista[indice] = { ...lista[indice], ...req.body, id: lista[indice].id, email: lista[indice].email };

  salvarProfissionais(lista);
  res.json(lista[indice]); // retorna o perfil atualizado
});

// ============================== LISTAR ÁREAS ==============================
app.get("/areas", (_req, res) => {
  const lista = lerProfissionais();
  const areas = [...new Set(lista.map((p) => p.area).filter(Boolean))].sort();
  res.json(areas);
});

// ============================== INICIAR SERVIDOR ==============================
const PORT = 5001;
app.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));