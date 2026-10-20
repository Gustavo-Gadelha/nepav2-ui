# NEPA v2 — UI

Interface do NEPA, núcleo de extensão e pesquisa da Faculdade Católica da Paraíba. Projeto em [Next.js](https://nextjs.org) (App Router) com React, Tailwind CSS v4 e shadcn/ui.

> Por enquanto é apenas frontend: não há backend e todas as ações de autenticação são simuladas (mock).

## Como rodar

Pré-requisito: [pnpm](https://pnpm.io) (o projeto usa `pnpm` como gerenciador de pacotes).

```bash
pnpm install   # instala as dependências
pnpm dev       # servidor de desenvolvimento em http://localhost:3000
```

Outros comandos:

| Comando      | Descrição                          |
| ------------ | ---------------------------------- |
| `pnpm dev`   | Servidor de desenvolvimento        |
| `pnpm build` | Build de produção                  |
| `pnpm start` | Serve o build de produção          |
| `pnpm lint`  | Executa o ESLint                   |

Se o servidor de desenvolvimento exibir código antigo após edições (erro de hidratação ou `x is not a function` em um export recém-criado), reinicie o `pnpm dev`.

## Rotas disponíveis

Todas as rotas ficam no grupo `(auth)` e compartilham o mesmo layout dividido em duas colunas.

| Rota                              | Descrição                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| `/`                               | Redireciona para `/login`                                                                        |
| `/login`                          | Entrar com e-mail e senha                                                                        |
| `/register`                       | Cadastro de nova conta                                                                           |
| `/mfa`                            | Verificação em duas etapas (código de 6 dígitos)                                                 |
| `/forgot-password`                | Recuperação de senha: informar o e-mail                                                          |
| `/forgot-password/verify-code`    | Recuperação de senha: validar o código recebido                                                  |
| `/forgot-password/new-password`   | Recuperação de senha: definir a nova senha                                                       |
| `/activate-account`               | Aguardando ativação: pede para verificar o e-mail e permite reenviar (aceita `?email=` opcional) |
| `/activate-account?token=<token>` | Link recebido por e-mail: valida o token e ativa a conta                                         |
| `/activate-account?token=expired` | Mock: simula um link de ativação expirado                                                        |

As etapas da recuperação de senha não podem ser puladas pela URL: o estado do fluxo é guardado no `sessionStorage`.

A rota `/portal` (destino após o login) ainda não existe.

## Valores de teste (mock)

Como não há API, as respostas são simuladas em `src/lib/auth/mock.ts`:

- **Senha** `errada`: o login falha.
- **Código** `123456`: é o único código válido (MFA e recuperação de senha).
- **Token** `expired` em `/activate-account`: simula um link de ativação expirado.

## Estrutura

```text
src/
├── app/            # rotas (App Router) e estilos globais
├── components/
│   ├── auth/       # blocos compartilhados das telas de autenticação
│   └── ui/         # componentes shadcn/ui (base-nova, sobre @base-ui/react)
└── lib/
    ├── auth/       # schemas (zod), mock da API, fluxo de recuperação, formatadores
    └── utils.ts    # cn()
```

O guia de design está em [DESIGN.md](DESIGN.md) e as convenções de desenvolvimento em [CLAUDE.md](CLAUDE.md).
