# Product Graph Front

Front-end em **React 19 + TypeScript + Vite** do painel administrativo **Product Graph** — uma dashboard para gestão de produtos, vendas e usuários, com gráficos e atualização em tempo real. Consome a API **Product Graph API**.

A interface inclui autenticação por rota protegida, listagens paginadas com modais de criação/edição, gráficos com **Recharts** e notificações com **React Toastify**. A comunicação em tempo real usa **Socket.IO Client**, e a estilização é feita com **Tailwind CSS 4**.

## Funcionalidades

- **Autenticação** com rota protegida (`AuthGuard`) e envio de cookies para a API (`withCredentials: true`).
- **Dashboard** com KPIs e gráficos (Recharts).
- **Gestão de produtos, vendas e usuários** com tabelas e modais de criação/edição.
- **Upload de imagens** (produtos e avatares) integrado à API.
- **Atualização em tempo real** via Socket.IO.
- **Notificações** (toasts) e animações com Framer Motion.

## Tecnologias

- **React 19** + **TypeScript**
- **Vite 7** (bundler e servidor de desenvolvimento)
- **React Router DOM 7** (roteamento)
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **Axios** (cliente HTTP)
- **Recharts** (gráficos)
- **Socket.IO Client** (tempo real)
- **React Toastify** (notificações), **Framer Motion** (animações), **Lucide React** (ícones), **React Input Mask** (máscaras)

## Pré-requisitos

- **Node.js** 18 ou superior e **npm**
- A **Product Graph API** em execução em `http://localhost:3000` (URL configurada em `src/services/api.ts`)

## Instalação e execução

1. Clone o repositório e entre na pasta:

   ```bash
   git clone https://github.com/giuseppinhu/productGraphFront.git
   cd productGraphFront
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   A aplicação abre em **http://localhost:5173** (porta padrão do Vite).

### Scripts disponíveis

| Script | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento (Vite) |
| `npm run build` | Type-check (`tsc -b`) e build de produção |
| `npm run preview` | Serve localmente o build de produção |
| `npm run lint` | Executa o ESLint em todo o projeto |

## Configuração da API

A URL base da API é definida em `src/services/api.ts`:

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // envia o cookie de autenticação
});
```

Ajuste `baseURL` caso a API esteja em outro endereço.

## Rotas da aplicação

Definidas em `src/App.tsx` com React Router. As rotas do painel ficam protegidas pelo `AuthGuard`.

| Rota | Acesso | Descrição |
| --- | --- | --- |
| `/` | Público | Página inicial (Home) |
| `/login` | Público | Tela de login |
| `/dashboard` | Protegido | Painel com KPIs e gráficos |
| `/sales` | Protegido | Gestão de vendas |
| `/users` | Protegido | Gestão de usuários |
| `/products` | Protegido | Gestão de produtos |
| `*` | Público | Página não encontrada (404) |

## Exemplo de uso

Fazendo uma requisição autenticada com a instância do Axios já configurada:

```ts
import { api } from "./services/api";

// login (o cookie httpOnly é definido pela API)
await api.post("/login", { email, password });

// busca produtos (cookie enviado automaticamente por withCredentials)
const { data } = await api.get("/product");
```

## Estrutura do projeto

```
productGraphFront/
├── public/               # Assets estáticos
├── src/
│   ├── components/        # Componentes (Sidebar, Dashboard, Modals, Table, etc.)
│   ├── pages/             # Páginas (Home, Login, Dashboard, Products, Sales, Users)
│   ├── guard/             # AuthGuard (proteção de rotas)
│   ├── services/          # Instância do Axios (api.ts)
│   ├── utils/             # Helpers (formatData, formatPrice, sliceString)
│   ├── types/             # Tipos globais (global.d.ts)
│   ├── App.tsx            # Definição das rotas
│   ├── layout.tsx         # Layout do painel
│   └── main.tsx           # Ponto de entrada
├── index.html
├── vite.config.ts
└── package.json
```

## Contribuição

1. Faça um fork do repositório.
2. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`.
3. Rode o lint antes de commitar: `npm run lint`.
4. Faça commits claros e descritivos: `git commit -m "feat: adiciona X"`.
5. Abra um Pull Request descrevendo a mudança.

## Licença

Projeto privado (campo `private` no `package.json`). Defina uma licença antes de distribuir publicamente.

---

Desenvolvido por **Giuseppe**.
