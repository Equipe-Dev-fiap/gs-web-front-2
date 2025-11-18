# 🌐 ConectaPro – Plataforma de Conexão Profissional

O ConectaPro é uma plataforma profissional desenvolvida com React (frontend) e Node.js + Express (backend), permitindo que usuários criem perfis, recomendem outros profissionais e conversem via chat integrado.

O sistema conta com:

Sistema de login e autenticação simples (localStorage)

Cadastro completo de perfil profissional

Dashboard com busca e filtros

Recomendações entre usuários (não é possível recomendar a si mesmo)

Inbox de mensagens e chat individual

Estrutura organizada em arquivos JSON (sem banco de dados)

🚀 Resumo do Projeto

O ConectaPro foi desenvolvido para simular uma rede profissional, onde usuários podem:

Criar uma conta

Preencher seu perfil profissional

Explorar outros profissionais

Enviar recomendações

Iniciar conversas privadas

Acessar todas as conversas na aba Mensagens

Ele funciona totalmente com arquivo JSON, ideal para ambiente acadêmico e demonstrações rápidas.

---

## 👤 Usuários e Senhas (para testes)

  {
    "nome": "Ana Silva",
    "email": "ana.silva@site.com",
    "senha": "123456"
  },
  {
    "nome": "Bruno Costa",
    "email": "bruno.costa@site.com",
    "senha": "123456"
  },
  {
    "nome": "Carla Souza",
    "email": "carla.souza@site.com",
    "senha": "123456"
  },
  {
    "nome": "Daniel Ferreira",
    "email": "daniel.ferreira@site.com",
    "senha": "123456"
  },
  {
    "nome": "Elisa Gomes",
    "email": "elisa.gomes@site.com",
    "senha": "123456"
  },
  {
    "nome": "Fábio Rodrigues",
    "email": "fabio.rodrigues@site.com",
    "senha": "123456"
  }

> Os dados ficam salvos em:  
> `backend/data/usuarios.json` e `backend/data/profissionais.json`.

---

## 🛠️ Instalação do Projeto – Passo a Passo

### ✅ 1. Pré-requisitos

Antes de tudo, é importante ter instalado na máquina:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- `npm` (já vem junto com o Node)
- Git (opcional, se for clonar o repositório)

---

### 📂 2. Baixar o projeto

Você pode:

- **Clonar o repositório** (se estiver no GitHub):  
  ```bash
  git clone https://github.com/Equipe-Dev-fiap/gs-web-front-2.git

3. Instalar e rodar o FRONTEND

Abra o terminal na pasta raiz do projeto.

Acesse a pasta do frontend:

cd frontend


Instale as dependências do front:

npm install


Rode o projeto frontend:

npm run dev


O Vite vai mostrar um endereço (geralmente http://localhost:5173).
Abra esse link no navegador para acessar a interface do ConectaPro.

⚙️ 4. Instalar e rodar o BACKEND (API em Node/Express)

Em um novo terminal (ou na mesma janela, depois que terminar o passo do front), volte para a pasta raiz do projeto se ainda não estiver nela.

Acesse a pasta do backend:

cd backend


Instale as dependências do back:

npm install


Rode o servidor backend:

npm run backend


O servidor deverá subir em algo como:

http://localhost:5001


No terminal aparecerá uma mensagem parecida com:
✅ Servidor rodando em http://localhost:5001

Importante: frontend e backend precisam estar rodando ao mesmo tempo
para que login, cadastro, recomendações e mensagens funcionem corretamente.

depois so clicar no link disponibilizado do frontend

💾 5. Arquivos de Dados (JSON)

Usuários: backend/data/usuarios.json

Perfis profissionais: backend/data/profissionais.json

Mensagens: backend/data/mensagem.json

Você pode pré-cadastrar usuários e perfis editando esses arquivos manualmente (mantendo o formato JSON válido).

🔗 Link do Repositório

https://github.com/Equipe-Dev-fiap/gs-web-front-2.git

👥 Integrantes do Grupo

Rafael Augusto Carmona/ RM: 563758
Eduardo Tolentino/ RM: 562169
Enzo Hort Ramos/ RM: 561872

