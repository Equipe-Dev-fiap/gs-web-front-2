const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static(path.join(__dirname, '../public')));

// Caminhos dos JSONs
const usuariosPath = path.join(__dirname, "data/usuario.json");
const profissionaisPath = path.join(__dirname, "data/profissionais.json");
const mensagensPath = path.join(__dirname, "data/mensagem.json");

// ======================= FUNÇÕES AUXILIARES =======================
const lerProfissionais = () =>
  JSON.parse(fs.readFileSync(profissionaisPath, "utf8"));

const salvarProfissionais = (dados) =>
  fs.writeFileSync(profissionaisPath, JSON.stringify(dados, null, 2));

const lerMensagens = () => {
  try {
    if (!fs.existsSync(mensagensPath)) {
      // se não existir ainda, começa com []
      return [];
    }
    const conteudo = fs.readFileSync(mensagensPath, "utf8");
    if (!conteudo.trim()) {
      // arquivo vazio
      return [];
    }
    return JSON.parse(conteudo);
  } catch (e) {
    console.error("Erro ao ler mensagem.json:", e);
    return [];
  }
};

const salvarMensagens = (dados) =>
  fs.writeFileSync(mensagensPath, JSON.stringify(dados, null, 2));

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

  res.json({
    message: "ok",
    usuario: {
      nome: usuarioEncontrado.nome,
      email: usuarioEncontrado.email,
    },
  });
});

// ============================== REGISTER ==============================
app.post("/register", (req, res) => {
  const { nome, email, senha } = req.body;

  const usuarios = JSON.parse(fs.readFileSync(usuariosPath, "utf8"));
  const profissionais = JSON.parse(fs.readFileSync(profissionaisPath, "utf8"));
  const existe = usuarios.find((u) => u.email === email);
  if (existe) {
    return res.status(400).json({ message: "Email já cadastrado" });
  }

  // Criar novo user
  const novoUser = { nome, email, senha };
  usuarios.push(novoUser);
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));

  // Criar perfil vazio AUTOMATICAMENTE
  const novoPerfil = {
    id: profissionais.length + 1,
    email,
    nome,
    foto: "",
    resumo: "",
    cargo: "",
    area: "",
    localizacao: "",
    habilidadesTecnicas: [],
    softSkills: [],
    experiencias: [],
    formacao: [],
    projetos: [],
    certificacoes: [],
    idiomas: [],
    areaInteresses: [],
    recomendadoPor: [],
  };

  profissionais.push(novoPerfil);
  salvarProfissionais(profissionais);

  res.status(201).json({ message: "Usuário + perfil criados com sucesso!" });
});

// ============================== LISTAR PROFISSIONAIS ==============================
app.get("/profissionais", (req, res) => {
  const lista = lerProfissionais();
  const { email } = req.query;

  if (email) {
    return res.json(
      lista.filter(
        (p) =>
          (p.email || "").toLowerCase() === (email || "").toLowerCase()
      )
    );
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

  const image = req.body.foto;
  const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

  // Decodifica a string Base64 em bytes
  const buffer = Buffer.from(base64Data, "base64");

  // Gera um nome de arquivo (exemplo simples)
  const fileName = `${id}.jpg`;
  const filePath = path.join(__dirname, "../public", fileName);

console.log("Salvando imagem em:", filePath);   

fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error("Erro ao salvar imagem:", err);
      return res.status(500).json({ error: "Erro ao salvar imagem" });
    }

    res.json({
      message: "Imagem salva com sucesso!",
      fileName,
      filePath,
    });
  });
  
  let profissional = req.body;
  profissional.foto = fileName; // Remove a foto do objeto para evitar sobrescrever
  lista[indice] = {
    ...lista[indice],
    ...profissional,
    id: lista[indice].id,
    email: lista[indice].email,
  };

  salvarProfissionais(lista);
  res.json(lista[indice]);
});

// ============================== LISTAR ÁREAS ==============================
app.get("/areas", (_req, res) => {
  const lista = lerProfissionais();
  const areas = [...new Set(lista.map((p) => p.area).filter(Boolean))].sort();
  res.json(areas);
});

// ============================ RECOMENDAR PERFIL ===========================
app.post("/profissionais/:id/recomendar", (req, res) => {
  const id = Number(req.params.id);
  const { recomendadorEmail, recomendadorNome } = req.body;

  if (!recomendadorEmail) {
    return res.status(400).json({ message: "Email do recomendador é obrigatório." });
  }

  const lista = lerProfissionais();
  const indice = lista.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({ message: "Perfil não encontrado." });
  }

  const perfil = lista[indice];

  // Não deixa recomendar o próprio perfil
  if (perfil.email && perfil.email.toLowerCase() === recomendadorEmail.toLowerCase()) {
    return res.status(400).json({ message: "Você não pode recomendar o próprio perfil." });
  }

  if (!Array.isArray(perfil.recomendadoPor)) {
    perfil.recomendadoPor = [];
  }

  const jaExiste = perfil.recomendadoPor.some(
    (r) => r.email.toLowerCase() === recomendadorEmail.toLowerCase()
  );

  if (!jaExiste) {
    perfil.recomendadoPor.push({
      email: recomendadorEmail,
      nome: recomendadorNome || recomendadorEmail,
    });
  }

  lista[indice] = perfil;
  salvarProfissionais(lista);

  res.json(perfil);
});

// ============================================================================
// 🟦 SISTEMA DE CHAT — mensagem.json
// ============================================================================

// ➤ Enviar mensagem (cria conversa automaticamente)
app.post("/mensagens", (req, res) => {
  const { remetente, destinatario, texto } = req.body;

  if (!remetente || !destinatario || !texto) {
    return res.status(400).json({ message: "Dados incompletos." });
  }

  const mensagens = lerMensagens();

  const novaMensagem = {
    id: mensagens.length + 1,
    remetente,
    destinatario,
    texto,
    data: new Date().toISOString(),
  };

  mensagens.push(novaMensagem);
  salvarMensagens(mensagens);

  res.json(novaMensagem);
});

// ➤ Listar mensagens entre dois usuários
app.get("/mensagens/conversa", (req, res) => {
  const { user1, user2 } = req.query;

  const mensagens = lerMensagens();

  const conversa = mensagens.filter(
    (m) =>
      (m.remetente === user1 && m.destinatario === user2) ||
      (m.remetente === user2 && m.destinatario === user1)
  );

  res.json(conversa);
});

// ➤ Listar conversas que um usuário participou (para Inbox)
app.get("/mensagens/inbox/:email", (req, res) => {
  const email = req.params.email;
  const mensagens = lerMensagens();

  const participantes = {};

  mensagens.forEach((m) => {
    if (m.remetente === email) participantes[m.destinatario] = true;
    if (m.destinatario === email) participantes[m.remetente] = true;
  });

  res.json(Object.keys(participantes));
});

// ============================== INICIAR SERVIDOR ==============================
const PORT = 5001;
app.listen(PORT, () =>
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`)
);